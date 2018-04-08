<template>
    <!-- Exercise 1 -->
    <!-- Create a Signup Form where you retrieve the following Information -->
    <!-- Full Name (First Name + Last Name) -->
    <!-- Mail -->
    <!-- Password -->
    <!-- Store Data? Yes/No -->

    <!-- Exercise 2 -->
    <!-- Only display the Form if it has NOT been submitted -->
    <!-- Display the Data Summary ONCE the Form HAS been submitted -->

    <!-- Exercise 3 -->
    <!-- Edit the Example from above and create a custom "Full Name" Control -->
    <!-- which still holds the First Name and Last Name Input Field -->
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" type="text" class="form-control" name="firstName" v-model="signup.firstName" />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" type="text" class="form-control" name="lastName" v-model="signup.lastName" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control" name="email" v-model="signup.email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" class="form-control" name="password" v-model="signup.password" />
                    </div>
                    <div class="form-group">
                        <div class="radio-inline">
                            <label for="storeYes">
                                <input id="storeYes" type="radio" name="storeData" v-model="signup.storeData" value="Store Data" />Store Data
                            </label>
                        </div>
                        <div class="radio-inline">
                            <label for="storeNo">
                                <input id="storeNo" type="radio" name="storeData" v-model="signup.storeData" value="Don't Store Data" />Don't Store Data
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button class="btn btn-primary" type="submit" @click.prevent="submit">Submit</button>
                </div>
            </div>
        </form>
        <hr>
        <div class="row" v-if="isSubmitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ signup.firstName + ' ' + signup.lastName }}</p>
                        <p>Email: {{ signup.email }}</p>
                        <p>Password: {{ signup.password }}</p>
                        <p>Store in Database?: {{ signup.storeData }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                signup: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    storeData: 'Store Data'
                },
                isSubmitted: false
            }
        },
        methods: {
            submit() {
                this.isSubmitted = true;
            }
        }
    }
</script>

<style scoped>

</style>
