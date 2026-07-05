type Listener<T extends unknown[] = unknown[]> = (...args: T) => void;

interface IEventEmitter {
    on: (eventName: string, listener: Listener) => void;
    once: (eventName: string, listener: Listener) => void;
    off: (eventName: string, listener: Listener) => void;
    emit: (eventName: string, ...payload: unknown[]) => void;
    removeAllListeners: (eventName?: string) => void;
}

class EventEmitter implements IEventEmitter {
    // To store callbacks for the given events
    private eventCallbackMap = new Map<string, Set<Listener>>();

    // To register a listener for given event
    on(eventName: string, callback: Listener) {
        if (this.eventCallbackMap.has(eventName)) {
            this.eventCallbackMap.get(eventName)?.add(callback);
        } else {
            this.eventCallbackMap.set(eventName, new Set([callback]));
        }
    }

    // To register a listener for a given event to execute only once
    once(eventName: string, callback: Listener) {
        const wrapper = (...payload: unknown[]) => {
            this.off(eventName, wrapper);
            callback(...payload);
        };

        this.on(eventName, wrapper);
    }

    // To degister a listener
    off(eventName: string, callback: Listener) {
        if (this.eventCallbackMap.has(eventName)) {
            this.eventCallbackMap.get(eventName)?.delete(callback);
        }
    }

    // To fire a event to execute all the listener
    emit(eventName: string, ...args: unknown[]) {
        const listeners = this.eventCallbackMap.get(eventName);
        if (listeners) {
            for (const callback of listeners) {
                callback(...args);
            }
        }
    }

    // To remove listener for a specific event and all listeners
    removeAllListeners(eventName?: string) {
        if (eventName !== undefined) {
            this.eventCallbackMap.delete(eventName);
        } else {
            this.eventCallbackMap.clear();
        }
    }
}

const emitter = new EventEmitter();
const onUserLogin = () => console.log('User has logged in.');
emitter.on('user-log-in', onUserLogin);
emitter.emit('user-log-in');
