import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IEvent } from "../models/event";
import agent from "../api/agent";

//mobx strict mode
configure({ enforceActions: "always" });

class EventStore {
  @observable eventRegistry = new Map();
  @observable events: IEvent[] = [];
  @observable selectedEvent: IEvent | undefined;
  @observable editMode: boolean = false;
  @observable loadingInitial: boolean = false;
  @observable submitting: boolean = false;
  @observable target = "";

  //use this when we already have the data inside our store, but can be modifed with the store
  @computed get eventsByDate() {
    return Array.from(this.eventRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  //in mobx to change an observable, need action
  // loading events
  @action loadEvents = async () => {
    this.loadingInitial = true;
    try {
      const events = await agent.Events.list();
      runInAction("loading events", () => {
        events.forEach((event) => {
          // looping through response data and spliting the datetime at the period, we only want the first part so you add [0] at the end
          event.date = event.date.split(".")[0];
          this.eventRegistry.set(event.id, event);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load events error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  //create event
  @action createEvent = async (event: IEvent) => {
    this.submitting = true;
    try {
      await agent.Events.create(event);
      runInAction("create event", () => {
        this.eventRegistry.set(event.id, event);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create event errors", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editEvent = async (event: IEvent) => {
    this.submitting = true;
    try {
      await agent.Events.update(event);
      runInAction("edit event", () => {
        this.eventRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit event error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteEvent = async (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = e.currentTarget.name;
    try {
      await agent.Events.delete(id);
      runInAction("deleting event", () => {
        this.eventRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete event error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedEvent = this.eventRegistry.get(id);
    this.editMode = true;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedEvent = undefined;
  };

  @action cancelSelectedEvent = () => {
    this.selectedEvent = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };
  // selecting event
  @action selectEvent = (id: string) => {
    this.selectedEvent = this.eventRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new EventStore());
