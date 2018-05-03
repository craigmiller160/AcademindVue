<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" @submit.prevent="onSignin" ref="form">
                                <v-layout row>
                                    <v-flex xs12>
                                        <h2>Signin for Meetups</h2>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="Mail"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            :rules="[requiredRule, emailRule]"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            :rules="[requiredRule]"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn class="primary" type="submit" :disabled="!valid || loading" :loading="loading">
                                            Sign in
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import ValidationRulesMixin from '@/mixins/ValidationRulesMixin';
    import { mapGetters } from 'vuex';
    import '@/css/loader.css';

    export default {
        data() {
            return {
                email: '',
                password: '',
                valid: true
            }
        },
        methods: {
            onSignin() {
                if (this.$refs.form.validate()) {
                    console.log('Valid Signin');
                    const data = {
                        email: this.email,
                        password: this.password
                    };
                    this.$store.dispatch('signUserIn', data);
                }
                else {
                    console.log('Invalid Signin');
                }
            },
            onDismissed() {
                console.log('Dismissed Alert');
                this.$store.dispatch('clearError');
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'error',
                'loading'
            ])
        },
        mixins: [
            ValidationRulesMixin
        ],
        watch: {
            user(value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style scoped>

</style>
