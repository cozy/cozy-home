# Collect Configuration

The main configuration file is [/src/config.collect.json](../src/config/collect.json). Configuration parameter are:

## ignoreJobsAfterInSeconds
The default delay after a runnning or queued job will be ignored. The default value is 7200 milliseconds, which is two hours.

This means that if a job has his `state` property equal to `running` or `queued` after this amount of time, it be considered by collect as failed or corrupt and will not be considered by Collect.
