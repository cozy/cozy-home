# Cozy Home Configuration

The main configuration file is [/src/config/home.json](../src/config/home.json). Its provides a convenient way to centralize global parameters of Cozy Home.

Configuration parameters are:

## defaultDateFormat

If Cozy Home cannot retrieve date format from locales, it will use the format specified for this parameter.

## defaultTriggerTimeInterval

When no time interval is given in a konnector's manifest, Cozy Home will use the one specified for this parameter.

When an account is associated to a trigger, the trigger will need a time to run, for example 3:00PM.

A time interval defines the start time and the end time between the trigger launch time will be randomized.

For example, for a given time interval `[Ø, 5]`, the trigger launch time will be scheduled between 0:00PM and 5:00AM.
It could be for example 2:49AM.

It is used to avoid having all the trigger launched at the same time.
