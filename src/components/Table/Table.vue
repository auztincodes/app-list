<template>
	<div class="table__wrapper">
		<div class="table__loading" v-if="loading">
			<div class="table__loading-header"></div>
			<div class="table__loading-row" v-for="i in 4" :key="i">
				<div class="table__loading-item" v-for="j in 7" :key="j"></div>
			</div>
		</div>
		<table class="table" v-else>
			<thead class="table__header">
                <tr>
                    <th
                    class="table__header-item"
                        scope="col"
                        v-for="header in tableHeaders"
                        :key="header.name"
                    >
                        {{ header.name }}
                       
                    </th>
                </tr>
            </thead>
			<tbody>
				<tr
					class="table__row"
					v-for="(item, index) in tableData"
					:key="index"
				>
					<slot slot:table-row :item="item" :index="index"></slot>
				</tr>
			</tbody>
			
		</table>
		<div class="empty__table" v-if="tableData && tableData.length === 0 && !loading">
         <img src="@/assets/icons/empty-state-image.svg" svg-inline />
          <h4 class="empty__table-header"><slot name="empty-header" /></h4>
      </div>
	</div>
</template>

<script src="./table.js"></script>
<style lang="scss" src="./table.scss"></style>
