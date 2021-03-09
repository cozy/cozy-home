# Connection state

In this document we'll gather all information and parameters needed to get the connection state in cozy-home.

## Some definitions and context

* **Konnector:** It means a script available that can be used to connect a service account to the Cozy. We say that the konnector is 'installed' if it's registered in the Cozy database. If a konnector is not installed by default in the Cozy, it will be just before its very first usage/connection.

* **Account:** A document created from the login informations provided by the user in the konnector form or by an OAuth connection. In this account will be stored all informations related to the connected service account but also the frequency or the directory ID if the konnector needs a directory to store some files.

* **Job:** When the user connect a new service using a konnector, a job will be created on the stack side. This job corresponds to the konnector script run on the server side by the stack. It can have different status like `RUNNING` or `DONE`.

* **KonnectorResult:** It corresponds to the last result of a konnector's job run by the stack. It is used to get the last result of a konnector if an account is connected and not any job (for this konnector) is running. It also has status like `ERRORED` if an error occured.

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

> **Example of usage**:
>
> * `NOT CONNECTED`: display nothing as status icon
> * `RUNNING`: display a loading spinner
> * `CONNECTED`: display a success icon
> * `ERRORED`: display an error icon

## Triggers V2

_Triggers v2_ is the name of the next implementation of the whole konnector logic. The connection statues will change consequently.
KonnectorResults documents will be deprecated and all information about connection will be centralized into Trigger documents.
The condition for connection state will be:

* `NOT CONNECTED`
  * NOT existing Trigger

A new state `CREATING` may be used, to indicate that he connection is intializing itself, before the trigger is created.

* `CREATING`
  * Directory `CREATING`
  * OR Konnector `INSTALLING`
  * OR Account `CREATING`

* `RUNNING`
  * Trigger exists
  * AND : Job `RUNNING`

* `CONNECTED`
  * Trigger exists
  * AND Job `DONE`

* `ERRORED`
  * Konnector `ERRORED`
  * OR Trigger exists
    * AND Job `ERRORED`
