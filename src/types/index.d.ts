import { Context as BaseContext, Api, SessionFlavor } from "grammy"
import { HydrateFlavor, HydrateApiFlavor } from "@grammyjs/hydrate"
import {ModelFlavor, SessionData} from './flavors'

type MyContext = BaseContext & HydrateFlavor<BaseContext> & SessionFlavor<SessionData> & ModelFlavor
type MyApi = HydrateApiFlavor<Api>

export { MyContext, MyApi }
