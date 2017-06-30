<template>
	<div id="dashboard">
		<div class="row">
			<div class="col-12">
				<h1 class="intro">Dashboard <i class="fa fa-bolt" aria-hidden="true"></i> <span class="header-small"> Post your keeps, manage your vaults, and be awesome!</span></h1>
				<router-link :to="'/'"><button type="button" class="vaultsbtn pull-left">All Keeps</button></router-link> &nbsp; <button type="button" class="keepsbtn pull-right"
				 @click="keepsToggle">My Keeps</button> &nbsp; <button type="button" class="vaultsbtn pull-right" @click="vaultsToggle">My Vaults</button> &nbsp; 
			</div>
		</div>
		<user-vaults v-if="this.showVaults"></user-vaults>
		<user-keeps v-if="this.showKeeps"></user-keeps>
	</div>
</template>


<script>
	import UserVaults from '@/components/UserVaults'
	import UserKeeps from '@/components/UserKeeps'
	export default {
		name: 'dashboard',
		data() {
			return {
				showVaults: true,
				showKeeps: false
			}
		},
		mounted() {
			this.$store.dispatch('getvaults', this.user)
			this.$store.dispatch('getAllKeeps', this.user)
		},
		computed: {
			user() {
				return this.$store.state.user
			},
			vaults() {
				return this.$store.state.vaults
			},
			keeps() {
				return this.$store.state.keeps
			}
		},
		methods: {
			vaultsToggle() {
				this.showVaults = true;
				this.showKeeps = false;
			},
			keepsToggle() {
				this.showKeeps = true;
				this.showVaults = false;
			}
		},
		components: {
			UserVaults,
			UserKeeps
		}
	}

</script>


<style>
	#dashboard {
		padding: 20px;
	}

	.create {
		text-align: left;
		padding: 20px;
		padding-top: 25px;
	}

	.small {
		font-size: 18px;
	}

	.header-small {
		font-size: 16px;
	}

	.intro {
		border: 1px solid #84FF30;
		padding: 20px;
		background-color: #84FF30;
		border-radius: 20px;
		font-size: 26px;
		text-align: left;
	}

	.vault-form {
		border: 1px solid #292b2c;
		padding: 40px;
		margin-bottom: 30px;
		border-radius: 10px;
	}

	.your-vaults {
		padding: 20px;
		padding-bottom: 5px;
		text-align: left;
	}

	.keepsbtn {
		font-size: 22px;
		color: #fff;
		background-color: #0275d8;
		border: 0px;
		padding: 10px 50px 10px 50px;
		border-radius: 5px;
		transition-duration: 0.4s;
		margin-top: 15px;
		margin-left: 20px;
	}

	.keepsbtn:hover {
		background-color: #FF4FE7;
	}

	.vaultsbtn {
		font-size: 22px;
		color: #fff;
		background-color: #0275d8;
		border: 0px;
		padding: 10px 50px 10px 50px;
		border-radius: 5px;
		transition-duration: 0.4s;
		margin-top: 15px;
	}

	.vaultsbtn:hover {
		background-color: #FF4FE7;
	}

	hr {
		border: 0;
		height: 1px;
		background: #333;
		background-image: linear-gradient(to right, #ccc, #333, #ccc);
		width: 75%;
	}

	.card-columns {
		margin: 0px 20px 20px 20px;
	}
</style>