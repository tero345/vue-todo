// 커스텀 타입스 정의해서 사용
export namespace VueEvent {
    export interface Input<T extends EventTarget> extends InputEvent {
        target : T;
    }
}