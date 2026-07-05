type Listener<T extends unknown[] = unknown[]> = (...args: T) => void;

interface IEventEmitter {
    on: (eventName: string, listener: Listener) => void;
    off: (eventName: string, listener: Listener) => void;
    emit: (eventName: string, ...payload: unknown[]) => void;
}

class EventEmitter implements IEventEmitter {
    // To store callbacks for the given events
    private eventCallbackMap = new Map<string, Set<Listener>>();

    on(eventName: string, callback: Listener) {
        if (this.eventCallbackMap.has(eventName)) {
            this.eventCallbackMap.get(eventName)?.add(callback);
        } else {
            this.eventCallbackMap.set(eventName, new Set([callback]));
        }
    }

    off(eventName: string, callback: Listener) {
        if (this.eventCallbackMap.has(eventName)) {
            this.eventCallbackMap.get(eventName)?.delete(callback);
        }
    }

    emit(eventName: string, ...args: unknown[]) {
        const listeners = this.eventCallbackMap.get(eventName);
        if (listeners) {
            for (const callback of listeners) {
                callback(...args);
            }
        }
    }
}

const emitter = new EventEmitter();
const onUserLogin = () => console.log('User has logged in.');
emitter.on('user-log-in', onUserLogin);
emitter.emit('user-log-in');
