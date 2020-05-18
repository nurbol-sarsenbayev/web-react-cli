import { action, computed, observable } from 'mobx'
import { I%component%Store } from './I%component%Store'
import { I%component%ParentStore } from './models'
import translations from './translations'

export class %component%Store implements I%component%Store {

    constructor (private parentStore: I%component%ParentStore) {
    }
}
