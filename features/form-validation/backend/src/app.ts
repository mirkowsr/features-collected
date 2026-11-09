declare global {
  namespace NodeJS {
    interface HotModuleData {
      closePromise?: Promise<void>
    }

    interface HotModule {
      accept: () => void
      data?: HotModuleData
      dispose: (callback: (data: HotModuleData) => void) => void
    }

    interface Module {
      hot?: HotModule
    }
  }
}
