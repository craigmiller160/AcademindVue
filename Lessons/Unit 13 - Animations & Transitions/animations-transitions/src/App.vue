<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <hr />
                <select v-model="alertAnimation" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br/>
                <button class="btn btn-primary" @click="show = !show">Show Alert</button>
                <br /><br />
                <transition :name="alertAnimation">
                    <div class="alert alert-info" v-if="show">This is some info</div>
                </transition>
                <transition name="slide" type="transition">
                    <div class="alert alert-info" v-if="show">This is some info</div>
                </transition>
                <transition enter-class="" enter-active-class="animated bounceIn" leave-class="" leave-active-class="animated bounceOut" appear>
                    <div class="alert alert-info" v-if="show">This is some info</div>
                </transition>
                <hr />
                <!-- The thing below is transitioning between two elements -->
                <transition :name="alertAnimation" mode="out-in">
                    <div class="alert alert-info" v-if="show" key="info">This is some info</div>
                    <div class="alert alert-warning" v-else key="warning">This is some warning</div>
                </transition>
                <hr />
                <!-- This is where JavaScript animations go -->
                <button class="btn btn-primary" @click="load = !load">Load / Remove Element</button>
                <br /><br />
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @enter-cancelled="enterCancelled"
                            @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @leave-cancelled="leaveCancelled" :css="false">
                    <div style="width: 300px; height: 100px; background-color: lightgreen;" v-if="load"></div>
                </transition>
                <hr />
                <button class="btn btn-primary" @click="toggleComponent">Toggle Components</button>
                <br /><br />
                <transition name="fade" mode="out-in">
                    <component :is="selectedComponent"></component>
                </transition>
                <hr />
                <button class="btn btn-primary" @click="addItem">Add Item</button>
                <ul class="list-group">
                    <transition-group name="slide">
                        <li style="cursor: pointer;" class="list-group-item" v-for="(number, index) in numbers" :key="number" @click="removeItem(index)">{{ number }}</li>
                    </transition-group>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import DangerAlert from './DangerAlert';
    import SuccessAlert from './SuccessAlert';

    export default {
        data() {
            return {
                show: false,
                load: true,
                alertAnimation: 'fade',
                elementWidth: 100,
                selectedComponent: 'app-success-alert',
                numbers: [1, 2, 3, 4, 5]
            }
        },
        components: {
            appDangerAlert: DangerAlert,
            appSuccessAlert: SuccessAlert
        },
        methods: {
            beforeEnter(element) {
                console.log('Before Enter');
                this.elementWidth = 100;
                element.style.width = `${this.elementWidth}px`;
            },
            enter(element, doneFn) {
                console.log('Enter');
                let round = 1;
                const interval = setInterval(() => {
                    element.style.width = `${this.elementWidth + round * 10}px`;
                    round++;
                    if (round > 20) {
                        clearInterval(interval);
                        doneFn(); //Needed to tell VueJS when the animation finishes
                    }
                }, 20);
            },
            afterEnter(element) {
                console.log('After Enter');
            },
            enterCancelled(element) {
                console.log('Enter Cancelled')
            },
            beforeLeave(element) {
                console.log('Before Leave');
                this.elementWidth = 300;
                element.style.width = `${this.elementWidth}px`;
            },
            leave(element, doneFn) {
                console.log('Leave');
                let round = 1;
                const interval = setInterval(() => {
                    element.style.width = `${this.elementWidth - round * 10}px`;
                    round++;
                    if (round > 20) {
                        clearInterval(interval);
                        doneFn(); //Needed to tell VueJS when the animation finishes
                    }
                }, 20);
            },
            afterLeave(element) {
                console.log('After Leave')
            },
            leaveCancelled(element) {
                console.log('Leave Cancelled');
            },
            toggleComponent() {
                if (this.selectedComponent === 'app-success-alert') {
                    this.selectedComponent = 'app-danger-alert';
                }
                else {
                    this.selectedComponent = 'app-success-alert';
                }
            },
            addItem() {
                const pos = Math.floor(Math.random() * this.numbers.length);
                this.numbers.splice(pos, 0, this.numbers.length + 1);
            },
            removeItem(index) {
                this.numbers.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave {

    }

    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }

    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity 1s;
    }

    .slide-leave {

    }

    .slide-move {
        transition: transform 1s;
    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
        position: absolute;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }
</style>
