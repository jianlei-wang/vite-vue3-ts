import { defineStore } from 'pinia'
import { storeHome } from '../types/home'

export const useHomeStore = defineStore('index', {
    state: (): storeHome => {
        return {
            count: 0,
            status: false
        }
    },
    getters: {
        curCount(): number {
            return this.count * 3
        },
        curStatus(): boolean {
            return this.status
        }
    },
    actions: {
        updatecount(val: number) {
            this.count = val
        },
        changeStatus(val: boolean) {
            this.status = val
        }
    }
})