<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>GENERAR RFC </h5>

                <div class="field">
                    <label>Tipo de Persona:</label>
                    <SelectButton v-model="tipoPersona" :options="tiposPersonaOptions" optionLabel="name" optionValue="code" @change="limpiarFormulario" />
                </div>

                <!-- FORMULARIO PERSONA FÍSICA -->
                <div v-if="tipoPersona === 'fisica'" class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="nombre">Nombre(s):</label>
                        <InputText id="nombre" type="text" v-model="formFisica.nombre" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="apellidoPaterno">Apellido Paterno:</label>
                        <InputText id="apellidoPaterno" type="text" v-model="formFisica.apellidoPaterno" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="apellidoMaterno">Apellido Materno: (Opcional)</label>
                        <InputText id="apellidoMaterno" type="text" v-model="formFisica.apellidoMaterno" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="fechaNacimiento">Fecha Nacimiento:</label>
                        <Calendar id="fechaNacimiento" v-model="formFisica.fechaNacimiento" dateFormat="dd/mm/yy" :showIcon="true" placeholder="dd/mm/aaaa" />
                    </div>
                </div>

                <!-- FORMULARIO PERSONA MORAL -->
                <div v-if="tipoPersona === 'moral'" class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-8">
                        <label for="razonSocial">Razón Social:</label>
                        <InputText id="razonSocial" type="text" v-model="formMoral.razonSocial" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="fechaCreacion">Fecha Creación:</label>
                        <Calendar id="fechaCreacion" v-model="formMoral.fechaCreacion" dateFormat="dd/mm/yy" :showIcon="true" placeholder="dd/mm/aaaa" />
                    </div>
                </div>

                <!-- RESULTADO Y BOTÓN -->
                <div class="p-fluid formgrid grid" style="margin-top: 1rem;">
                    <div class="field col-12 md:col-6">
                        <label for="rfcGenerado">RFC Generado:</label>
                        <InputText id="rfcGenerado" type="text" v-model="rfcGenerado" readonly />
                    </div>
                     <div class="field col-12 md:col-6 flex align-items-end">
                        <Button label="GENERAR RFC" @click="generarRfc" class="p-button-success" style="width: auto;"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';

const tipoPersona = ref('fisica');
const tiposPersonaOptions = ref([
    { name: 'Persona Física', code: 'fisica' },
    { name: 'Persona Moral', code: 'moral' }
]);

const formFisica = reactive({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: null
});

const formMoral = reactive({
    razonSocial: '',
    fechaCreacion: null
});

const rfcGenerado = ref('');

const limpiarFormulario = () => {
    formFisica.nombre = '';
    formFisica.apellidoPaterno = '';
    formFisica.apellidoMaterno = '';
    formFisica.fechaNacimiento = null;
    formMoral.razonSocial = '';
    formMoral.fechaCreacion = null;
    rfcGenerado.value = '';
};

const normalizarTexto = (str) => {
    if (!str) return '';
    return str.toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/Ñ/g, 'N')
        .replace(/[^A-Z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const obtenerFechaFormateada = (fechaInput) => {
    if (!fechaInput) return 'XXXXXX';
    const fecha = new Date(fechaInput);
    const anio = fecha.getFullYear().toString().slice(-2);
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
    return anio + mes + dia;
};

// --- NUEVA FUNCIÓN PARA GENERAR HOMOCLAVE SIMULADA ---
const generarHomoclaveSimple = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let homoclave = '';
    for (let i = 0; i < 3; i++) {
        homoclave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return homoclave;
};
// --- FIN NUEVA FUNCIÓN ---

const generarRfc = () => {
    rfcGenerado.value = '';
    let rfcParcial = '';

    if (tipoPersona.value === 'fisica') {
        if (!formFisica.nombre || !formFisica.apellidoPaterno || !formFisica.fechaNacimiento) {
            alert('Para Persona Física, complete Nombre, Apellido Paterno y Fecha de Nacimiento.');
            return;
        }

        const ap = normalizarTexto(formFisica.apellidoPaterno);
        const am = normalizarTexto(formFisica.apellidoMaterno);
        const nom = normalizarTexto(formFisica.nombre);

        if (ap.length === 0) rfcParcial += 'XX';
        else if (ap.length === 1) rfcParcial += ap.charAt(0) + 'X';
        else rfcParcial += ap.substring(0, 2);

        rfcParcial += am.charAt(0) || 'X';

        const nombres = nom.split(' ');
        let primerNombreParaRfc = nombres[0] || '';
        if ((primerNombreParaRfc === 'MARIA' || primerNombreParaRfc === 'JOSE') && nombres.length > 1) {
            primerNombreParaRfc = nombres[1] || '';
        }
        rfcParcial += primerNombreParaRfc.charAt(0) || 'X';

        rfcParcial += obtenerFechaFormateada(formFisica.fechaNacimiento);

    } else if (tipoPersona.value === 'moral') {
        if (!formMoral.razonSocial || !formMoral.fechaCreacion) {
            alert('Para Persona Moral, complete Razón Social y Fecha de Creación.');
            return;
        }

        let rs = normalizarTexto(formMoral.razonSocial);
        const articulos = ['EL', 'LA', 'LOS', 'LAS', 'Y', 'DE', 'DEL', 'COMPAÑIA', 'SOCIEDAD', 'SC', 'SA', 'CV', 'RL', 'INC'];
        articulos.forEach(articulo => {
            const regex = new RegExp(`\\b${articulo}\\b`, 'g');
            rs = rs.replace(regex, '');
        });
        rs = rs.replace(/\s+/g, '').trim();

        if (rs.length === 0) rfcParcial += 'XXX';
        else if (rs.length === 1) rfcParcial += rs.charAt(0) + 'XX';
        else if (rs.length === 2) rfcParcial += rs.substring(0, 2) + 'X';
        else rfcParcial += rs.substring(0, 3);

        rfcParcial += obtenerFechaFormateada(formMoral.fechaCreacion);
    }

    // --- AÑADIR HOMOCLAVE SIMULADA ---
    if (rfcParcial.length > 0) { // Solo añade homoclave si se generó la primera parte
        rfcParcial += generarHomoclaveSimple();
    }
    // --- FIN AÑADIR HOMOCLAVE ---

    rfcGenerado.value = rfcParcial.toUpperCase();
};

</script>

<style scoped>
.field label {
    margin-bottom: 0.5rem;
    display: block;
}
.p-selectbutton .p-button {
    flex-grow: 0;
}
</style>