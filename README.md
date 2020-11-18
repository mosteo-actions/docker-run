# docker-run

This action allows you to run a command of your choosing inside a docker
container given by its tag in Docker Hub. 

See [this
discussion](https://github.community/t/expressions-in-docker-uri/16271) for
more background context.

You can, of course, create an Action that runs in a predetermined image. Or you
can run your 

In other words, this action is a workaround for the limitation in GitHub
Actions (as of 2020-11-18) that expressions cannot be used for defining the
actual image of the container to be used:

Invalid example:

```
job:
   runs-on: ubuntu-latest
   container: 
      image: ${{ matrix.tag }}
   steps: 
   - run: uname -a
   # etc
```

Alternative invalid example:
```
steps:
   - uses: 'docker://${{ matrix.tag }}'
```

Workaround using this action:
```
job:
   runs-on: ubuntu-latest
   steps:
   - uses: mosteo-actions/docker-run@v1
     with:
       image: ${{ matrix.tag }}
       command: uname -a
   # etc
```

The action works by pulling the image and running your command in it. I don't
know if this has efficiency implications when compared to actions using Docker
the usual way.

Check the [action.yml](action.yml) file for accepted parameters.
