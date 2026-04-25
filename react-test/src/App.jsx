import React from "react";

function App() {
  return (
    <div className="flex center min-h-screen p-4">
      <div className="p-6">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 color-primary">Complete User Management</h1>
          <p className="text-center color-text-muted mb-6">Sort, Filter, Search & Select All Features</p>


          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <button className="filled primary md">
                <span className="button-icon-left">
                  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add User
                </span>
              </button>
              <button className="outlined success md">
                <span className="button-icon-left">
                  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Export CSV
                </span>
              </button>
              <button className="outlined danger md">
                <span className="button-icon-left">
                  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete Selected
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm color-text-muted">Selected:</span>
              <span className="badge primary filled sm">0</span>
            </div>
          </div>


          <div className="table-filter-container mb-4">
            <div className="table-filter-header">

              <div className="table-search">
                <div className="input-icon-left">
                  <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input type="text" placeholder="Search by name, email or role..." className="glow" disabled />
                </div>
              </div>


              <div className="filter-actions">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Active</button>
                <button className="filter-btn">Pending</button>
                <button className="filter-btn">Inactive</button>
              </div>
            </div>


            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">

                <div className="flex-1">
                  <label className="block text-sm font-medium color-text-muted mb-2">Filter by Role:</label>
                  <select className="select w-full" disabled>
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="tester">Tester</option>
                  </select>
                </div>


                <div className="flex-1">
                  <label className="block text-sm font-medium color-text-muted mb-2">Joined Date:</label>
                  <select className="select w-full" disabled>
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>


                <div className="flex-1">
                  <label className="block text-sm font-medium color-text-muted mb-2">Sort By:</label>
                  <select className="select w-full" disabled>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="date_asc">Date (Oldest)</option>
                    <option value="date_desc">Date (Newest)</option>
                    <option value="status">Status</option>
                    <option value="role">Role</option>
                  </select>
                </div>


                <div className="flex items-end">
                  <button className="outlined danger" disabled>
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className="flex items-center mb-4">
            <input type="checkbox" id="selectAll" className="primary" disabled />
            <label htmlFor="selectAll" className="ml-2 font-medium">Select All Users</label>
          </div>


          <div className="desktop-only table-responsive">
            <table className="table primary bordered motion-smooth">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>ID</th>
                  <th>User Details</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td><input type="checkbox" className="primary" disabled /></td>
                  <td>#001</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="circle primary filled sm">AJ</div>
                      <div>
                        <div className="font-semibold">Alex Johnson</div>
                        <div className="text-xs color-text-muted">+1-234-5678</div>
                      </div>
                    </div>
                  </td>
                  <td>alex@example.com</td>
                  <td><span className="badge primary filled sm">admin</span></td>
                  <td><span className="badge success filled sm">active</span></td>
                  <td>2024-01-15</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="filled primary sm" disabled>Edit</button>
                      <button className="outlined danger sm" disabled>Delete</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><input type="checkbox" className="primary" disabled /></td>
                  <td>#002</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="circle primary filled sm">SM</div>
                      <div>
                        <div className="font-semibold">Sarah Miller</div>
                        <div className="text-xs color-text-muted">+1-234-5679</div>
                      </div>
                    </div>
                  </td>
                  <td>sarah@example.com</td>
                  <td><span className="badge info filled sm">manager</span></td>
                  <td><span className="badge success filled sm">active</span></td>
                  <td>2024-02-20</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="filled primary sm" disabled>Edit</button>
                      <button className="outlined danger sm" disabled>Delete</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><input type="checkbox" className="primary" disabled /></td>
                  <td>#003</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="circle info filled sm">RW</div>
                      <div>
                        <div className="font-semibold">Robert Wilson</div>
                        <div className="text-xs color-text-muted">+1-234-5680</div>
                      </div>
                    </div>
                  </td>
                  <td>robert@example.com</td>
                  <td><span className="badge warning filled sm">designer</span></td>
                  <td><span className="badge warning filled sm">pending</span></td>
                  <td>2024-03-10</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="filled primary sm" disabled>Edit</button>
                      <button className="outlined danger sm" disabled>Delete</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><input type="checkbox" className="primary" disabled /></td>
                  <td>#004</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="circle secondary filled sm">ED</div>
                      <div>
                        <div className="font-semibold">Emily Davis</div>
                        <div className="text-xs color-text-muted">+1-234-5681</div>
                      </div>
                    </div>
                  </td>
                  <td>emily@example.com</td>
                  <td><span className="badge danger filled sm">tester</span></td>
                  <td><span className="badge danger filled sm">inactive</span></td>
                  <td>2024-01-05</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="filled primary sm" disabled>Edit</button>
                      <button className="outlined danger sm" disabled>Delete</button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><input type="checkbox" className="primary" disabled /></td>
                  <td>#005</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="circle primary filled sm">TB</div>
                      <div>
                        <div className="font-semibold">Thomas Brown</div>
                        <div className="text-xs color-text-muted">+1-234-5682</div>
                      </div>
                    </div>
                  </td>
                  <td>thomas@example.com</td>
                  <td><span className="badge success filled sm">developer</span></td>
                  <td><span className="badge success filled sm">active</span></td>
                  <td>2024-02-28</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="filled primary sm" disabled>Edit</button>
                      <button className="outlined danger sm" disabled>Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className="mobile-only">

            <div className="card mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="primary" disabled />
                  <div className="circle active filled">AJ</div>
                  <div>
                    <div className="font-semibold">Alex Johnson</div>
                    <div className="text-xs color-text-muted">#001</div>
                  </div>
                </div>
                <span className="badge primary filled sm">admin</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Email:</span>
                  <span className="text-sm">alex@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Phone:</span>
                  <span className="text-sm">+1-234-5678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Status:</span>
                  <span className="badge success filled sm">active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Joined:</span>
                  <span className="text-sm">2024-01-15</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="filled primary flex-1" disabled>Edit</button>
                <button className="outlined danger flex-1" disabled>Delete</button>
              </div>
            </div>


            <div className="card mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="primary" disabled />
                  <div className="circle active filled">SM</div>
                  <div>
                    <div className="font-semibold">Sarah Miller</div>
                    <div className="text-xs color-text-muted">#002</div>
                  </div>
                </div>
                <span className="badge info filled sm">manager</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Email:</span>
                  <span className="text-sm">sarah@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Phone:</span>
                  <span className="text-sm">+1-234-5679</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Status:</span>
                  <span className="badge success filled sm">active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm color-text-muted">Joined:</span>
                  <span className="text-sm">2024-02-20</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="filled primary flex-1" disabled>Edit</button>
                <button className="outlined danger flex-1" disabled>Delete</button>
              </div>
            </div>
          </div>


          <div className="table-footer mt-4">
            <div className="footer-info">
              <span>Showing 1-5 of 10 users</span>
            </div>
            <div className="table-pagination">
              <button className="pagination-btn" disabled>← Previous</button>
              <div className="flex gap-1">
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn" disabled>2</button>
              </div>
              <button className="pagination-btn">Next →</button>
            </div>
            <div className="rows-per-page">
              <span>Show:</span>
              <select className="select xs" disabled>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
       <div>
<button className="filled primary md">
    <span className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Action Button
    </span>
</button>

</div>
    </div>
  );
}

export default App;
