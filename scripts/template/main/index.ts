import { Ipc } from '@quiteer/electron-ipc'
import preload from '@quiteer/electron-preload'
import { appInstance, logError, windowInstance } from '@youliso/electronic'
import { loadUrl } from './absolutePath'

appInstance.start().then(async () => {
  Ipc.init()

  windowInstance.setDefaultCfg({
    defaultUrl: loadUrl,
    defaultPreload: preload as string
  })

  const main = await windowInstance.create(
    {
      title: 'main',
      route: '/',
      headNative: true
    },
    {
      height: 700,
      width: 1000,
      webPreferences: {
        sandbox: false
      }
    }
  )
})
  .catch(logError)

