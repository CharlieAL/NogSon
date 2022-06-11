/* <div className=''>
            <div className='text-center '>
              <Input
                value={search}
                onChange={handleSearch}
                type={'search'}
                placeholder={'Search Products'}
              />
            </div>
            <div className=' pb-14 px-10 grid mobile:grid-cols-3 gap-4 '>
              {!array &&
                productos.map(
                  ({
                    id,
                    nombre,
                    imagen,
                    descripcion,
                    cliente,
                    status,
                    cantidad,
                    updatedAt,
                    createdAt
                  }) => (
                    <ListProducts
                      key={id}
                      name={nombre}
                      image={imagen}
                      descripction={descripcion}
                      custumer={cliente}
                      status={status}
                      quantity={cantidad}
                      updatedAt={updatedAt}
                      createdAt={createdAt}
                    />
                  )
                )}
              {array &&
                array.map(
                  ({
                    id,
                    nombre,
                    imagen,
                    descripcion,
                    cliente,
                    status,
                    cantidad,
                    updatedAt,
                    createdAt
                  }) => (
                    <ListProducts
                      key={id}
                      name={nombre}
                      image={imagen}
                      descripction={descripcion}
                      custumer={cliente}
                      status={status}
                      quantity={cantidad}
                      updatedAt={updatedAt}
                      createdAt={createdAt}
                    />
                  )
                )}
            </div>
          </div> */
