<template>
  <div class="home">
    <div class="container">
      <div class="d-flex h-center">
        <div>
          <h1 class="hero-text text-center"><span class="green">V</span>ue.js</h1>
          <h3 class="heading-description text-center">Real-time search and filter</h3>
          <p class="text-center mt-1"><span class="red">0</span> libraries and plugins<br>just <span class="red">Vue.js</span> framework and <span class="red">vanilla JavaScript</span></p>
        </div>
      </div>
      <div class="box neu-morphism-shadow mt-3 mb-3">
        <div class="search-wrapper d-flex h-center mb-1">
          <Search v-model="search_text" :realtimeAction="doSearch" :placeholder="search_placeholder"/>
        </div>
        <div class="switch-wrapper mb-1">
          <label class="d-flex mt-2 mb-1">Search by</label>
          <switch-component v-model="search_by" :types="search_types" class="mb-1"/>
          <label class="d-flex mt-2 mb-1">Filter by</label>
          <check-component v-model="check_by" :key="check_by[0]" :types="check_types"/>
        </div>
      </div>
      <div class="d-flex h-center">
        <Table v-if="result_list.length > 0" :rows="result_list" :type="search_by"/>
      </div>
    </div>
  </div>
</template>

<script>
import organizations from './../json/organizations.json'
import tickets from './../json/tickets.json'
import users from './../json/users.json'
import {characterEscaper, additionalFilters} from './../custom_methods/swivel_methods'
export default {
  name: 'home',
  data() {
    return {
      organizations: organizations,
      tickets: tickets,
      users: users,
      search_text: '',
      search_by: 1,
      search_types: [
        {
          id: 1,
          slug: 'organization',
          label: 'Organization',
          check_types: [
            {
              id: 1,
              slug: 'shared_tickets',
              label: 'Shared tickets',
              checked: false
            }
          ]
        },
        {
          id: 2,
          slug: 'users',
          label: 'Users',
          check_types: [
            {
              id: 1,
              slug: 'active',
              label: 'Active',
              checked: false
            },
            {
              id: 2,
              slug: 'verified',
              label: 'Verified',
              checked: false
            },
            {
              id: 3,
              slug: 'shared',
              label: 'Shared',
              checked: false
            },
            {
              id: 4,
              slug: 'suspended',
              label: 'Suspended',
              checked: false
            }
          ]
        },
        {
          id: 3,
          slug: 'tickets',
          label: 'Tickets',
          check_types: [
            {
              id: 1,
              slug: 'has_incidents',
              label: 'Has Incidents',
              checked: false
            }
          ],
          additional_filters: {
            priority: [
              {
                id: 1,
                slug: 'low',
                label: 'Low'
              },
              {
                id: 2,
                slug: 'normal',
                label: 'Normal'
              },
              {
                id: 3,
                slug: 'high',
                label: 'High'
              },
              {
                id: 4,
                slug: 'urgent',
                label: 'Urgent'
              }
            ],
            status: [
              {
                id: 1,
                slug: 'pending',
                label: 'Pending', 
              },
              {
                id: 2,
                slug: 'open',
                label: 'Open', 
              },
              {
                id: 3,
                slug: 'hold',
                label: 'Hold', 
              },
              {
                id: 4,
                slug: 'solved',
                label: 'Solved', 
              },
              {
                id: 5,
                slug: 'closed',
                label: 'Closed', 
              }
            ]
          }
        }
      ],
      check_by: [],
      check_types: [],
      result_list: [],
      search_placeholder: ''
    }
  },
  components: {
    // asynchronously load components to reduce the payload and speed up the page loading by chunking .js files
    Search: () => import("@/components/common/Search"),
    'switch-component': () => import("@/components/common/Switch"),
    'check-component': () => import("@/components/common/Check"),
    // List: () => import("@/components/common/List"),
    Table: () => import("@/components/common/Table")
  },
  computed: {
    filterCount() {
      return this.check_by.length
    }
  },
  methods: {
    doSearch() {
      this.result_list = []
      if (this.search_by === 1) {
        this.searchByOrganization()
      } else if (this.search_by === 2) {
        this.searchByUsers()
      } else if (this.search_by === 3) {
        this.searchByTickets()
      }
    },
    searchByOrganization() {
      // get the matching values for the given input
      let filtered_organizations = this.organizations.filter(organization => {
        // enabled multiple field search
        return organization.name.toLowerCase().match(this.search_text.toLowerCase()) ||
        organization.url.toLowerCase().match(this.search_text.toLowerCase()) ||
        organization.created_at.toLowerCase().match(this.search_text.toLowerCase()) ||
        organization.details.toLowerCase().match(this.search_text.toLowerCase()) ||
        organization.domain_names.filter(domain => domain.toLowerCase().match(this.search_text.toLowerCase())).length > 0 ? true : false ||
        organization.tags.filter(tag => tag.toLowerCase().match(this.search_text.toLowerCase())).length > 0 ? true : false
      })

      filtered_organizations = additionalFilters(filtered_organizations, this.check_by)

      let search_result = []
      // loop through matching values
      filtered_organizations.map(o => {
        // loop through matching values
        this.tickets.map(p => {
          if (o._id === p.organization_id) {
          // loop through matching values
            this.users.map(q => {
              if (p.submitter_id === q._id) {
                // declare to search result
                search_result.push({
                  ticket_subject: p.subject,
                  username: q.name
                })
              }
            })
          }
        })
      })
      this.result_list = search_result
    },
    searchByUsers() {
      // get the matching values for the given input
      let filtered_users = this.users.filter(user => {
        // set empty keys to refrain from crashing match function
        if (!user.name) {
          this.$set(user, 'name', ' ')
        } else if (!user.url) {
          this.$set(user, 'url', ' ')
        } else if (!user.alias) {
          this.$set(user, 'alias', ' ')
        } else if (!user.created_at) {
          this.$set(user, 'created_at', ' ')
        } else if (!user.locale) {
          this.$set(user, 'locale', ' ')
        } else if (!user.timezone) {
          this.$set(user, 'timezone', ' ')
        } else if (!user.last_login_at) {
          this.$set(user, 'last_login_at', ' ')
        } else if (!user.email) {
          this.$set(user, 'email', ' ')
        } else if (!user.phone) {
          this.$set(user, 'phone', ' ')
        } else if (!user.signature) {
          this.$set(user, 'signature', ' ')
        } else if (!user.role) {
          this.$set(user, 'role', ' ')
        } else if (!user.tags) {
          this.$set(user, 'tags', [])
        }
        // escape curly braces which affects to filter
        return user.name.toLowerCase().match(this.search_text.toLowerCase())  ||
        user.url.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.alias.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.created_at.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.locale.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.timezone.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.last_login_at.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.email.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.phone.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.signature.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.role.toLowerCase().match(this.search_text.toLowerCase()) ||
        user.tags.filter(tag => tag.toLowerCase().match(this.search_text.toLowerCase())).length > 0 ? true : false
      })
      filtered_users = additionalFilters(filtered_users, this.check_by)
      let search_result = []
      // loop through matching values
      filtered_users.map(o => {
        // loop through matching values
        this.tickets.map(p => {
          if (o._id === p.assignee_id) {
          // loop through matching values
            this.organizations.map(q => {
              if (p.organization_id === q._id) {
                // declare to search result
                search_result.push({
                  organization_name: q.name,
                  ticket_subject: p.subject,
                  username: q.name
                })
              }
            })
          }
        })
      })
      this.result_list = search_result
    },
    searchByTickets() {
      // get the matching values for the given input
      let filtered_tickets = this.tickets.filter(ticket => {
        // set empty keys to refrain from crashing match function
        if (!ticket.url) {
          this.$set(ticket, 'url', ' ')
        } else if (!ticket.created_at) {
          this.$set(ticket, 'created_at', ' ')
        } else if (!ticket.type) {
          this.$set(ticket, 'type', ' ')
        } else if (!ticket.subject) {
          this.$set(ticket, 'subject', ' ')
        } else if (!ticket.description) {
          this.$set(ticket, 'description', ' ')
        } else if (!ticket.priority) {
          this.$set(ticket, 'priority', ' ')
        } else if (!ticket.status) {
          this.$set(ticket, 'status', ' ')
        } else if (!ticket.due_at) {
          this.$set(ticket, 'due_at', ' ')
        } else if (!ticket.via) {
          this.$set(ticket, 'via', ' ')
        } else if (!ticket.tags) {
          this.$set(ticket, 'tags', [])
        }
        // escape curly braces which affects to filter
        return characterEscaper(ticket.url.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.created_at.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.type.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.subject.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.description.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.priority.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.status.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.due_at.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        characterEscaper(ticket.via.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase())) ||
        ticket.tags.filter(tag => characterEscaper(tag.toLowerCase()).match(characterEscaper(this.search_text.toLowerCase()))).length > 0 ? true : false
      })
      filtered_tickets = additionalFilters(filtered_tickets, this.check_by)
      let search_result = []
      // loop through matching values
      filtered_tickets.map(o => {
        // loop through matching values
        this.users.map(p => {
          if (p._id === o.assignee_id) {
          // loop through matching values
            this.organizations.map(q => {
              if (p.organization_id === q._id) {
                // declare to search result
                search_result.push({
                  organization_name: q.name,
                  ticket_subject: o.subject,
                  username: q.name
                })
              }
            })
          }
        })
      })
      this.result_list = search_result
    },
    initializeSearch(search_by) {
      this.search_by = search_by
      this.check_types = this.search_types.find(o => o.id === search_by).check_types
      this.search_placeholder = this.search_types.find(o => o.id === search_by).slug
    }
  },
  watch: {
    search_by: {
      immediate: true,
      deep: true,
      handler: function (new_val, old_val) {
        if (old_val) {
          this.initializeSearch(new_val)
          this.check_by = []
          this.doSearch()
        }
      }
    },
    filterCount: {
      immediate: true,
      deep: true,
      handler: function (new_val, old_val) {
        if (old_val !== new_val) {
          this.doSearch()
        }
      }
    }
  },
  mounted() {
    this.initializeSearch(1)
    this.doSearch()
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  width: 100%;
  max-width: 800px;
}
.hero-text,
.heading-description {
  font-family: 'Raleway', sans-serif;
  font-size: 7rem;
  color: #34495e;
  span {
    font-size: 7rem;
    color: #41b883;
  }
}
.hero-text {
  font-size: 7rem;
}
.heading-description {
  font-size: 1.55rem;
}
p, span {
  line-height: 24px;
  font-size: 1.2rem;
  color: #34495e;
}
.red {
  color: #ec3652;
}
</style>