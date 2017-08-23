# Connection state

In this document we'll gather all information and parameters needed to get the connection state in cozy-collect.

## Some definitions and context

* __Konnector:__ It means a script available that can be used to connect a service account to the Cozy. We say that the konnector is 'installed' if it's registered in the Cozy database. If a konnector is not installed by default in the Cozy, it will be just before its very first usage/connection.

* __Account:__ A document created from the login informations provided by the user in the konnector form or by an OAuth connection. In this account will be stored all informations related to the connected service account but also the frequency or the directory ID if the konnector needs a directory to store some files.

* __Job:__ When the user connect a new service using a konnector, a job will be created on the stack side. This job corresponds to the konnector script run on the server side by the stack. It can have different status like `RUNNING` or `DONE`.

* __KonnectorResult:__ It corresponds to the last result of a konnector's job run by the stack. It is used to get the last result of a konnector if an account is connected and not any job (for this konnector) is running. It also has status like `ERRORED` if an error occured.

## The account connection state

* `NOT CONNECTED`
    * NOT Konnector `INSTALLED` AND NOT Directory `CREATING` AND NOT Konnector `INSTALLING`
    * OR : Konnector `INSTALLED` AND NOT account

* `RUNNING`
    * Directory `CREATING`
    * OR : Konnector `INSTALLING`
    * OR : Konnector `INSTALLED`
        * AND account `CREATING`
    * OR : Job `RUNNING`

* `CONNECTED`
    * NOT Job `RUNNING`
    * AND : KonnectorResult
    * AND : KonnectorResult.state `DONE`

* `ERRORED`
    * NOT Job `RUNNING`
    * AND : KonnectorResult
    * AND : KonnectorResult.state `ERRORED`
    OR
    * Konnector `INSTALLED` AND KonnectorResult.state `ERRORED`

> __Example of usage__:
>    * `NOT CONNECTED`: display nothing as status icon
>    * `RUNNING`: display a loading spinner
>    * `CONNECTED`: display a success icon
>    * `ERRORED`: display an error icon
