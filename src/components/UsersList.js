

function UsersList({ users }) {
    return (
        <div className="pt-5">
            <h3>Available Users</h3>
            <div className="list-group border-bottom">
                {
                    users.map(x => {
                        return (
                            <a key={x.id} href="/" className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{x.firstName} {x.lastName}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{x.email}</div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UsersList;