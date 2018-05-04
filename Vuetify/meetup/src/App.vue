<template>
    <v-app>
        <v-navigation-drawer temporary overflow absolute v-model="sideNav">
            <v-list>
                <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link" exact>
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark class="primary"> <!-- The colors come from prebuilt classes -->
            <v-toolbar-side-icon @click="toggleSideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer;">DevMeetup</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link" exact>
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>
        </main>
    </v-app>
</template>

<script>
    const signedInMenuItems = [
        {
            icon: 'supervisor_account',
            title: 'View Meetups',
            link: '/meetups'
        },
        {
            icon: 'room',
            title: 'Organize Meetup',
            link: '/meetups/new'
        },
        {
            icon: 'person',
            title: 'Profile',
            link: '/profile'
        }
    ];

    const signedOutMenuItems = [
        {
            icon: 'face',
            title: 'Sign Up',
            link: '/signup'
        },
        {
            icon: 'lock_open',
            title: 'Sign In',
            link: '/signin'
        }
    ];


    export default {
        data() {
            return {
                sideNav: false
            }
        },
        methods: {
            toggleSideNav() {
                this.sideNav = !this.sideNav;
            }
        },
        computed: {
            menuItems() {
                if (this.userIsAuthenticated) {
                    return signedInMenuItems;
                }
                else {
                    return signedOutMenuItems;
                }
            },
            userIsAuthenticated() {
                const user = this.$store.getters.user;
                return user !== null && user !== undefined;
            }
        }
    }
</script>

<style>

</style>
