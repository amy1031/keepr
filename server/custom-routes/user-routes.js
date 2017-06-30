let Keeps = require('../models/keep')
let Vaults = require('../models/vault')

export default {
  getPublicKeeps: {
    path: '/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all keeps that are public'
      Keeps.find({ public: true })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeepsByUserId: {
    path: '/user/:id/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all keeps by user id'
      Keeps.find({ creatorId: req.session.uid })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getVaultsByUserId: {
    path: '/user/:id/vaults',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all vaults by user id'
      Vaults.find({ creatorId: req.session.uid })
        .then(vaults => {
          res.send(handleResponse(action, vaults))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeepsByVaultId: {
    path: '/vaults/:vaultId/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Return all keeps in a vault'
      Vaults.findById(req.params.vaultId)
        .then(vault => {
          Keeps.find({ vaults: req.params.vaultId })
            .then(keeps => {
              vault.keeps = keeps
              res.send(handleResponse(action, vault.keeps))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeepsByTag: {
    path: '/searchkeeps/:tag',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get keeps by tag'
      Keeps.find({ tags: req.params.tag })
        .then(keeps => {
            res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addKeeptoVault: {
    path: '/addvaulttokeep/:id',
    reqType: 'put',
    method(req, res, next) {
      let action = "Add a keep to a vault"
      Keeps.findOne({ _id: req.params.id })
        .then(keeps => {
          keeps.vaults.push(req.body.vaults)
          keeps.keepCount += 1
          keeps.save().then(() => {
            res.send(handleResponse(action, keeps))
          })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  increaseViewCount: {
    path: '/addviews/:id',
    reqType: 'put',
    method(req, res, next) {
      let action = "Increase Keep View Count"
      Keeps.findOne({ _id: req.params.id })
        .then(keeps => {
          keeps.viewCount += 1
          keeps.save().then(() => {
            res.send(handleResponse(action, keeps))
          })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}


function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
} 