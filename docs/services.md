## myselfFromIdentities

* Triggered when an io.cozy.identities is created or updated
* Will update the "me" io.cozy.contacts by merging io.cozy.identities documents in it

## updateAccounts

* Triggered when a com.bitwarden.ciphers is updated
* Will update io.cozy.accounts with the information from the updated ciphers

## deleteAccounts

* Triggered when a com.bitwarden.ciphers is deleted
* Deletes accounts that are linked to the deleted cipher 

## softDeleteOrRestoreAccounts

* Triggered when a com.bitwarden.ciphers is updated (unless the updated attribute is deletedDate)

This service deals with soft delete and restore from
bitwarden routes, used for a trash feature.
See <https://docs.cozy.io/en/cozy-stack/bitwarden/#put-bitwardenapiciphersiddelete>

When a cipher is soft deleted, a deletedDate field is added to the
cipher. Then, the service removes the encrypted credentials from the
referenced account and deletes the associated trigger.

When the cipher is restored, the deletedDate is removed: the service
recreates the account's trigger. The account's credentials are then
restored through the updateAccountsFromCipher service.
