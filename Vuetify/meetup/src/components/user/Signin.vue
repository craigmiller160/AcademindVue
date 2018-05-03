<template>
    <v-container>
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
                                        <v-btn class="primary" type="submit" :disabled="!valid">Sign in</v-btn>
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
            }
        },
        computed: {
            ...mapGetters([
                'user'
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
