<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid" @submit.prevent="onSignup" ref="form">
                                <v-layout row>
                                    <v-flex xs12>
                                        <h2>Signup for Meetups</h2>
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
                                <!-- TODO definitely an issue with the comparePasswords validation function, won't truly keep both fields in sync. Maybe need vuelidate? -->
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
                                        <v-text-field
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            v-model="confirmPassword"
                                            type="password"
                                            :rules="[requiredRule, comparePasswords]">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn class="primary" type="submit" :disabled="!valid">Sign up</v-btn>
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

    export default {
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                valid: true
            }
        },
        methods: {
            onSignup() {
                console.log(this.email);
                console.log(this.password);
                console.log(this.confirmPassword);
            }
        },
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Passwords do not match' : true;
            }
        },
        mixins: [
            ValidationRulesMixin
        ]
    }
</script>

<style scoped>

</style>
