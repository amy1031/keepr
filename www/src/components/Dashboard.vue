<template>
	<div id="dashboard">
		<div class="row">
			<div class="col-12">
				<h1>Dashboard</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				FORM HERE
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<h3>Vaults:</h3>
				<div v-for='vault in vaults'>
					<h4>{{vault.title}}</h4>
					<h5>{{vault.body}}</h5>
				</div>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
				<h3>Keeps:</h3>
				<div v-for='keep in keeps'>
					<h4>{{keep.title}}</h4>
					<h5>{{keep.body}}</h5>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>


<script>
	export default {
		name: 'dashboard',
		data() {
			return {

			}
		},
		mounted() {
			this.$store.dispatch('getvaults', this.user)
			this.$store.dispatch('getkeeps', this.user)
		},
		computed: {
			user() {
				return this.$store.state.user
			},
			vaults() {
				return this.$store.state.vaults
			},
			keeps() {
				return this.$store.state.myKeeps
			}
		},
		methods: {},
		components: {}
	}

</script>


<style scoped>
	#dashboard {
		padding: 20px;
	}
</style>