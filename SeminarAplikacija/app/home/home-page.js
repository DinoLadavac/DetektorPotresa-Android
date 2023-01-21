import {ViewModel} from "./aplikacija"

export function onNavigationTo(args) {
    const page = args.object
    page.bindingContext = new ViewModel()
}