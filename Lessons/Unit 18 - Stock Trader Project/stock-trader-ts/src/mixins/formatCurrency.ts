// export default {
//     filters: {
//         formatCurrency(value: number): string {
//             return `$${value.toLocaleString()}`;
//         }
//     }
// }

import Vue from 'vue';
import Component  from 'vue-class-component';

@Component
export class MyMixin extends Vue {
    helloWorld(): void {
        console.log('Hello World');
    }
}