<template>
    <div id="uservaults">
        <h2 class="create">Create a Vault <span class="small">Vaults allow you to store Keeps by category</span></h2>
        <div class="row justify-content-center">
            <div class="col-10">
                <form class="vault-form" @submit.prevent="createVault">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="title" aria-describedby="name" placeholder="Name" required>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="body" placeholder="Description (optional)">
                    </div>
                    <button type="submit" class="btn btn-primary createbtn">Create a Vault</button>
                </form>
            </div>
        </div>
        <hr>
        <h2 class="your-vaults">Your vaults:</h2>
        <div class="row">
            <div class="card-deck">
                <div v-for='vault in vaults'>
                    <div class="card">
                        <div class="card-block">
                            <h4 class="card-title">
                                <router-link :to="'/vaults/' + vault._id">{{vault.title}}</router-link>
                            </h4>
                            <p class="card-text">{{vault.body}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        name: 'uservaults',
        data() {
            return {
                title: '',
                body: ''
            }
        },
        mounted() {
            this.$store.dispatch('getvaults', this.user)
            this.$store.dispatch('getUserKeeps', this.user)
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            vaults() {
                return this.$store.state.vaults
            }
        },
        methods: {
            createVault() {
                this.$store.dispatch('createVault', {title: this.title, body: this.body})
            }
        },
        components: {}
    }

</script>


<style scoped>
.createbtn {
    width: 75%;
    padding: 10px;
    text-align: center;
    font-size: 20px;
    background-color: #FF4FE7;
    border: 0px;
}

.card-deck {
    margin: 0px 20px 20px 20px;
}

.card {
    margin: 20px;
    padding: 15px;
}
</style>