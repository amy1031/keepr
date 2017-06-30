<template>
	<div id="vault">
		<div class="row">
			<div class="col-12">
				<h1>{{currentVault.title}}</h1>
				<h5 v-if="currentVault.body">{{currentVault.body}}</h5>
				<button type="button" data-toggle="modal" data-target="#removeVault" class="btn btn-danger pull-right">Delete Vault</button>
			</div>
		</div>

		<!-- Keeps in this vault -->
		<div class="row">
			<div class="card-columns">
				<div v-for='keep in keeps'>
					<div class="card">
						<a :href="keep.linkUrl" target="_blank" class="titlelink"><img class="card-img-top img-fluid" :src="keep.imgUrl" alt="Card image cap"></a>
						<div class="card-block">
							<a :href="keep.linkUrl" target="_blank" @click="increaseViewCount(keep)">
								<h4 class="card-title">{{keep.title}}</h4>
							</a>
							<p class="card-text">{{keep.body}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Remove Vault Modal -->
		<div class="modal fade" id="removeVault" role="dialog">
			<div class="modal-dialog">

				<!-- Add Keep to Vault Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete Vault</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<h4>Are you sure you want to delete this vault?</h4>
						<h5>You cannot undo this action.</h5>
						<button tpye="button" class="btn btn-danger delete" @click="deleteVault">Delete</button> <button tpye="button" class="btn btn-primary cancel"
						 @click="cancelDelete">Cancel</button>
					</div>
				</div>
			</div>
		</div>

	</div>
	</div>
	</div>
</template>


<script>
	export default {
		name: 'vault',
		data() {
			return {

			}
		},
		mounted() {
			this.$store.dispatch('getvaultkeeps', this.$route.params.id)
			this.$store.dispatch('getvaults', this.$route.params.id)
		},
		computed: {
			user() {
				return this.$store.state.user
			},
			keeps() {
				return this.$store.state.vaultKeeps
			},
			vaults() {
				return this.$store.state.vaults
			},
			currentVault() {
				for (var i = 0; i < this.vaults.length; i++) {
					var currentVault = this.vaults[i]
					if (this.$route.params.id == currentVault._id) {
						return currentVault
					}
				}
			}
		},
		methods: {
			deleteVault() {
				$('#removeVault').modal('hide');
				this.$store.dispatch('deleteVault', this.currentVault)
			},
			cancelDelete() {
				$('#removeVault').modal('hide');
			}
		},
		components: {}
	}

</script>


<style scoped>
	#vault {
		padding: 20px;
	}

	.delete {
		margin-top: 20px;
	}

	.cancel {
		margin-top: 20px;
	}
</style>