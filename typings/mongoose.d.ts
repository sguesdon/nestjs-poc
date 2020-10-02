declare module "mongoose" {
  interface Model<T extends Document, QueryHelpers = {}> extends NodeJS.EventEmitter, ModelProperties {
    esSearch?: Function;
    search: Function;
    esCreateMapping?: Function;
  }
}
