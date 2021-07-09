<template>
  <div class="home">
    <v-header />
    <main class="container mt-4">
      <div class=" flex flex-spaced flex__item-center mb-2">
        <div class="text__title">
          <h2>Apps List</h2>
        </div>
        <c-button @click="toggleModalClass('showCreateApp')"
          >Create App</c-button
        >
      </div>

      <c-table
        :tableHeaders="tableHeaders"
        :loading="pageLoading"
        :tableData="apps"
      >
        <template name="table-row" slot-scope="{ item }">
          <td class="table__row-item">
            {{ item.name }}
          </td>
          <td class="table__row-item">
            {{ item.type }}
          </td>
          <td class="table__row-item">
            {{ item.framework }}
          </td>
          <td class="table__row-item">
           {{item.description}}
          </td>
          <td class="table__row-item dropdown">
            <toggle-dropdown>
              <template #dropdown-wrapper>
                <img src="@/assets/icons/menu3dot.svg" svg-inline />
              </template>
              <template #dropdown-items>
                <li
                  v-if="item.subscription"
                  class="dropdown__item"
                  @click="getSubscriptionDetail(item, 'showViewApp')"
                >
                  View App Details
                </li>
                <li
                  v-else
                  class="dropdown__item"
                  @click="openModal({ ...item }, 'showViewApp')"
                >
                  View App Details
                </li>
                <li
                  class="dropdown__item"
                  @click="openModal({ ...item }, 'showEditApp')"
                >
                  Edit App
                </li>
                <li
                  class="dropdown__item"
                  @click="openModal(item, 'showDeleteApp')"
                >
                  Delete App
                </li>
                <li
                  class="dropdown__item"
                  v-if="item.subscription === null"
                  @click="openModal(item, 'showSubscriptionModal')"
                >
                  Add Subscription
                </li>
                <li
                  v-if="item.subscription"
                  class="dropdown__item"
                  @click="getSubscriptionDetail(item, 'showUpgradeModal')"
                >
                  Upgrade
                </li>
              </template>
            </toggle-dropdown>
          </td>
        </template>
        <template #empty-header>
          No application found
        </template>
      </c-table>
    </main>

    <!-- create app modal -->
    <modal
      position="right"
      v-if="showCreateApp"
      :toggleClass="toggleClass"
      @close="toggleModalClass('showCreateApp')"
    >
      <template #title>
        <h3>Create App</h3>
      </template>
      <template #body>
        <form @submit.prevent="registerApp">
          <ValidationObserver v-slot="{ invalid }">
            <div class="auth-input">
              <c-input
                width="100%"
                type="text"
                name="Name your app"
                v-model="newApp.name"
                placeholder="Application name"
              />
              <div class="flex flex-spaced">
                <div class="form-group">
                  <label class="select-label" for="app-type">Type</label>
                  <select
                    class="select-input"
                    v-model="newApp.type"
                    width="204px"
                    name="app-type"
                    id="app-type"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="select-label" for="framework">Framework</label>
                  <select
                    class="select-input"
                    v-model="newApp.framework"
                    width="204px"
                    name="framework"
                    id="framework"
                  >
                    <option value="Django">Django</option>
                    <option value="React Native">React Native</option>
                  </select>
                </div>
              </div>
              <c-input
                width="100%"
                type="text"
                name="Domain"
                v-model="newApp.domain_name"
                placeholder="Domain name"
              />
              <c-input
                rules="required"
                width="100%"
                name="Description"
                type="textarea"
                v-model="newApp.description"
                placeholder="write a description of the app"
              />
              <div class="flex flex-end mb-2">
                <c-button
                  :disabled="invalid"
                  class="submit"
                  size="large"
                  submitType="submit"
                  buttonType="primary"
                >
                  <template v-if="!loading">Create App</template>
                  <Loader v-else />
                </c-button>
              </div>
            </div>
          </ValidationObserver>
        </form>
      </template>
    </modal>
    <!-- create app modal end -->
    <!-- view app modal -->
    <modal
      position="right"
      v-if="showViewApp"
      :toggleClass="toggleClass"
      @close="toggleModalClass('showViewApp')"
    >
      <template #title>
        <h3>View App</h3>
      </template>
      <template #body>
        <page-loader v-if="loading" />
        <div class="mb-2 grid__layout">
          <h5 class="col-6-12">App Name</h5>
          <p class="col-6-12">{{ appInfo.name }}</p>
        </div>
        <div class="mb-2 grid__layout">
          <h5 class="col-6-12">Type</h5>
          <p class="col-6-12">{{ appInfo.type }}</p>
        </div>
        <div class="mb-2 grid__layout">
          <h5 class="col-6-12">Frame Work</h5>
          <p class="col-6-12">{{ appInfo.framework }}</p>
        </div>

        <div class="mb-2 grid__layout">
          <h5 class="col-6-12">App Description</h5>
          <p class="col-6-12">{{ appInfo.description }}</p>
        </div>
        <template v-for="(plan, i) in plans">
          <template v-if="plan.id === subscription.plan && appInfo.subscription">
            <div class="mb-2 grid__layout" :key="i">
              <h5 class="col-6-12">Subscription Plan</h5>
              <p class="col-6-12">{{ plan.name }}</p>
            </div>
            <div class="mb-2 grid__layout" :key="plan.id">
              <h5 class="col-6-12">Subscription Amount</h5>
              <p class="col-6-12">${{ plan.price }}</p>
            </div>
          </template>
        </template>
        <div class="mb-2 grid__layout">
          <h5 class="col-6-12">Domain</h5>
          <p class="col-6-12">{{ appInfo.domain_name }}</p>
        </div>
      </template>
    </modal>
    <!-- view app modal end-->
    <!-- edit app modal -->
    <modal
      position="right"
      v-if="showEditApp"
      :toggleClass="toggleClass"
      @close="toggleModalClass('showEditApp')"
    >
      <template #title>
        <h3>Edit App</h3>
      </template>
      <template #body>
        <form @submit.prevent="updateApp">
          <ValidationObserver v-slot="{ invalid }">
            <div class="auth-input">
              <c-input
                rules="required"
                width="100%"
                type="text"
                name="Name your app"
                v-model="appInfo.name"
                placeholder="Application name"
              />
              <div class="flex flex-spaced">
                <div class="form-group">
                  <label class="select-label" for="app-type">Type</label>
                  <select
                    class="select-input"
                    v-model="appInfo.type"
                    width="204px"
                    name="app-type"
                    id="app-type"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="select-label" for="framework">Framework</label>
                  <select
                    class="select-input"
                    v-model="appInfo.framework"
                    width="204px"
                    name="framework"
                    id="framework"
                  >
                    <option value="Django">Django</option>
                    <option value="React Native">React Native</option>
                  </select>
                </div>
              </div>
              <c-input
                width="100%"
                type="text"
                name="Domain"
                v-model="appInfo.domain_name"
                placeholder="Domain name"
              />
              <c-input
                rules="required"
                width="100%"
                name="Description"
                type="textarea"
                v-model="appInfo.description"
                placeholder="write a description of the app"
              />
              <div class="flex flex-end mb-2">
                <c-button
                  :disabled="invalid"
                  class="submit"
                  size="large"
                  submitType="submit"
                  buttonType="primary"
                >
                  <template v-if="!loading">
                    <Loader v-if="loading" />Edit App</template
                  >
                  <Loader v-else />
                </c-button>
              </div>
            </div>
          </ValidationObserver>
        </form>
      </template>
    </modal>
    <!-- edit app modal end-->

    <!-- delete app modal -->
    <modal
      position="center"
      v-if="showDeleteApp"
      :toggleClass="toggleClass"
      @close="toggleModalClass('showDeleteApp')"
      maxWidth="400px"
    >
      <template #title>
        <h4 class="modal__header-title">Delete App</h4>
      </template>
      <template #body>
        <div class="modal__content">
          <p class="modal__content-text">
            Kindly confirm that you want to delete this app
            <span class="name"> ({{ appInfo.name }} ) </span>.
          </p>
          <div class="modal__content-btn">
            <div class="cancel" @click="toggleModalClass('showDeleteApp')">
              Cancel
            </div>
            <c-button
              class="config__btn"
              buttonType="warning"
              size="modal"
              @click="removeApp"
            >
              <template v-if="!loading">Delete</template>
              <Loader v-else />
            </c-button>
          </div>
        </div>
      </template>
    </modal>
    <!-- delete app modal end-->

    <!-- subscription  modal -->
    <modal
      position="right"
      v-if="showSubscriptionModal"
      maxWidth="900px"
      width="900px"
      :toggleClass="toggleClass"
      @close="toggleModalClass('showSubscriptionModal')"
    >
      <template #title>
        <h3>Add Subscription to {{ appInfo.name }}</h3>
      </template>
      <template #body>
        <div class="grid__layout">
          <div
            class="col-4-12 col-md-12 plan"
            v-for="plan in plans"
            :key="plan.id"
          >
            <card>
              <h4 class="plan-name">{{ plan.name }}</h4>
              <p class="plan-price">${{ plan.price }}</p>
              <p class="plan-desc mb-3">{{ plan.description }}</p>
              <c-button size="full" @click="selectPlan(plan)">Select</c-button>
            </card>
          </div>
        </div>
      </template>
    </modal>
    <!-- subscription  modal end -->

    <!-- upgrade subscription  modal -->
    <modal
      position="right"
      v-if="showUpgradeModal"
      maxWidth="900px"
      width="900px"
      :toggleClass="toggleClass"
      @close="toggleModalClass('showUpgradeModal')"
    >
      <template #title>
        <h3>Change {{ appInfo.name }} Subscription</h3>
      </template>
      <template #body>
        <page-loader v-if="loading" />
        <div class="grid__layout">
          <div
            class="col-4-12 col-md-12 plan"
            v-for="plan in plans"
            :key="plan.id"
          >
            <card>
              <h4 class="plan-name">{{ plan.name }}</h4>
              <p class="plan-price">${{ plan.price }}</p>
              <p class="plan-desc mb-3">{{ plan.description }}</p>
              <c-button
                :disabled="subscription.plan === plan.id"
                size="full"
                @click="upgradePlan(subscription.id, plan)"
              >
                <template v-if="subscription.plan === plan.id"
                  >Current</template
                >
                <template v-else>Select</template>
              </c-button>
            </card>
          </div>
        </div>
      </template>
    </modal>
    <!-- upgrade subscription  modal end -->
  </div>
</template>
<script src="./home.js"></script>
<style lang="scss" scoped src="./home.scss"></style>
