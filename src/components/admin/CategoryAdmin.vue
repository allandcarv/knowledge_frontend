<template>
    <div class="category-admin">
        <b-form v-if="show">
            <input id="category-id" type="hidden" v-model="category.id">
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Nome:" label-for="category-name">
                        <b-form-input id="category-name" v-model="category.name" type="text" required placeholder="Informe o nome da Categoria..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-if="mode === 'save'">
                <b-col cols="12">
                    <b-form-group label="Categoria Pai:" label-for="category-parentId">
                        <b-form-select id="category-parentId" v-model="category.parentId" :options="categories" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col cols="12">
                    <b-form-group label="Categoria Pai:" label-for="category-parentId">
                        <b-form-input id="category-parentId" type="text" v-model="category.path" readonly />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save()">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove()">Deletar</b-button>
                    <b-button variant="secondary" class="ml-2" @click="reset()">Cancelar</b-button>
                </b-col>
            </b-row>   
        </b-form>
        <b-table hover striped responsive :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)">
                    <i class="fa fa-pencil" />
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')" class="ml-2">
                    <i class="fa fa-trash" />
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl, showError } from '@/global'

export default {
    name: 'CategoryAdmin',
    data: function() {
        return { 
            mode: 'save',
            category: {},
            categories: [],
            show: true,
            fields: [
                { key: 'id', label: 'Código', sortable: true},
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'path', label: 'Caminho', sortable: true},
                { key: 'actions', label: 'Ações' }
            ],            
            options: [
                { value: null, text: ''}
            ]
        }
    },
    methods: {
        loadCategories() {
            const url = `${baseApiUrl}/categories`;
            axios.get(url)
                .then(res => { 
                    this.categories = res.data.map(category => {
                        return { ...category, value: category.id, text: category.path }
                    });
                })
        },
        reset() {
            this.mode = 'save';
            this.category = {};
            this.loadCategories();
            this.show = false;
            this.$nextTick(() => { this.show = true 
            });
        },
        save() {
            const method = this.category.id ? 'put' : 'post';
            const url = `${baseApiUrl}/categories/${this.category.id ? this.category.id : ''}`
            axios[method](url, this.category)
                .then(() => { 
                    this.$toasted.global.defaultSuccess()
                    this.reset();
                })
                .catch(showError);
        },
        remove() {
            this.mode = "remove";
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios.delete(url)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadCategory(category, mode = 'save') {
            this.mode = mode;
            this.category = { ...category };
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>

<style>

</style>
