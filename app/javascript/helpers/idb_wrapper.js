import { openDB } from 'idb'

// A simple wrapper for IndexedDB and inititalizing the database
export default class IdbWrapper {
  constructor (dbName = 'EVMap', dbVersion = 1, storeName = 'faveChargerPoints') {
    this.dbName = dbName
    this.dbVersion = dbVersion
    this.storeName = storeName
    this.db = this.getDb(dbName, dbVersion, storeName)
  }

  async getDb (dbName, dbVersion, storeName) {
    return await openDB(dbName, dbVersion, {
      upgrade (db) {
        db.createObjectStore(storeName)
      }
    })
  }

  async get (key) {
    return (await this.db).get(this.storeName, key.toString())
  }

  async set (key, val) {
    return (await this.db).put(this.storeName, val, key)
  }

  async delete (key) {
    return (await this.db).delete(this.storeName, key.toString())
  }

  async clear () {
    return (await this.db).clear(this.storeName)
  }

  async count () {
    return (await this.db).count(this.storeName)
  }

  async close () {
    return (await this.db).close()
  }

  async deleteDatabase () {
    return (await this.db).delete()
  }
}
