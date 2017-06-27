let Keeps = require('../models/keep')
let Vaults = require('../models/vault')

export default {
  getPublicKeeps: {
    path: '/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all keeps that are public'
      Keeps.find()
        .then(keeps => {
          for (var i = 0; i < keeps.length; i++) {
            var keep = keeps[i]
            if (keep.public == true) {
              res.send(handleResponse(action, keep))
            }
          }
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
    path: '/keeps/:tag',
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