
# Cache()

  Manager and placeholder of the cache object.
  
  ## Examples
  
     Klass.cache()
     // get all
     // => {Object}
  
     Klass.cache('foo.myclass')
     // get
     // => {*}
  
     Klass.cache('foo.myclass', *)
     // set
     // => {*}

# Cache.get()

  Get an element from the cache container.

# Cache.set()

  Add or replace a element in the cache container.
  
  Returns the give element;

# Cache.remove()

  To be implemented. Removes an element from the cache container.
  
  Returns the cache container.

# Cache.clear()

  Empty the cache container and returns it.