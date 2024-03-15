import { ref } from 'valtio';

declare module 'valtio' {
    type Ref<T extends object> = ReturnType<typeof ref<T>>;
}
