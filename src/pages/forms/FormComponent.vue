<template>
  <!-- <div>{{ employees }}</div> -->
  <div style="padding: 16px">
    <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
      <div class="q-title text-center">
        <h4 class="panel-title">ข้อมูลส่วนตัว</h4>
      </div>
      <div class="row gutter-md">
        <!-- <div class="col-12">
          <label for="emp-id">EP-ID/รหัส:</label>
          <q-field>
            <input
              type="text"
              name="emp-id"
              v-model="employee.id"
              placeholder="Id/รหัส"
              required
              disabled
              class="form-control form-control-lg"
            />
          </q-field>
        </div> -->
        <div class="col-12">
          <q-input
            color="white"
            bg-color="green"
            standout
            bottom-slots
            v-model="employee.name"
            label="ชื่อ-สกุล"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="person_add" />
            </template>
            <template v-slot:append>
              <q-icon name="favorite" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row gutter-md">
        <div class="col-12">
          <q-input
            color="white"
            bg-color="green"
            standout
            bottom-slots
            v-model="employee.study_faculty"
            label="ระบุสาขาวิชา"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="school" />
            </template>
            <template v-slot:append>
              <q-icon name="favorite" />
            </template>
          </q-input>

          <q-select
            color="green"
            v-model="employee.study_faculty"
            :options="department.options"
            label="เลือกสาขา"
          >
            <template v-slot:prepend>
              <q-icon name="school" />
            </template>
          </q-select>
        </div>
        <div class="col-12">
          <q-input
            color="white"
            bg-color="green"
            standout
            bottom-slots
            v-model="employee.university"
            label="ระบุสถาบันการศึกษา"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="school" />
            </template>
            <template v-slot:append>
              <q-icon name="favorite" />
            </template>
          </q-input>
          <q-select
            color="green"
            v-model="employee.university"
            :options="university.options"
            label="เลือกสถาบันการศึกษา"
          >
            <template v-slot:prepend>
              <q-icon name="school" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row gutter-md">
        <div class="col-12">
          <q-input
            color="white"
            bg-color="green"
            standout
            bottom-slots
            v-model="employee.disability_type"
            label="ระบุความบกพร่อง"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="assist_walker" />
            </template>
            <template v-slot:append>
              <q-icon name="favorite" />
            </template>
          </q-input>
          <q-select
            color="green"
            v-model="employee.disability_type"
            :options="disability.options"
            label="เลือกประเภทความพิการ"
          >
            <template v-slot:prepend>
              <q-icon name="assist_walker" />
            </template>
          </q-select>
        </div>
      </div>
      <div style="padding: 16px" class="flex justify-center">
        <q-btn
          type="submit"
          color="grey-4"
          text-color="black"
          glossy
          unelevated
          icon="save"
          label="Save/บันทึก"
        />
        <q-btn
          type="reset"
          color="grey-4"
          text-color="black"
          glossy
          unelevated
          icon="clear"
          label="Cancel/ยกเลิก"
        />
      </div>
    </form>
  </div>

  <!-- <div class="py-2">
    {{ employees_ }}
  </div>
  <div class="py-2">
    {{ employee }}
  </div> -->
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">EP-ID</th>
          <th scope="col">Name</th>
          <th scope="col">Study Faculty</th>
          <th scope="col">University</th>
          <th scope="col">Disibility type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in employees" :key="row.index">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.study_faculty }}</td>
          <td>{{ row.university }}</td>
          <td>{{ row.disability_type }}</td>
          <td>
            <button class="btn btn-primary" @click="editUser(row.id)">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-warning" @click="deleteUser(row.id)">
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormComponent",
  data() {
    return {
      message: "Form Component (แบบฟอร์มบันทึกข้อมูล)",
      employees: Array,
      employees_: Array,
      university: {
        options: [
          "มหาวิทยาลัยเชียงใหม่",
          "มหาวิทยาลัยแม่โจ้",
          "มหาวิทยาลัยราชภัฏเชียงใหม่",
        ],
      },
      department: {
        options: [
          "การบริหารจัดการ",
          "การเงินและการจัดการ",
          "บริหารธุรกิจ",
          "วิทยาการคอมพิวเตอร์",
        ],
      },
      disability: {
        options: [
          "การเห็น",
          "การได้ยิน",
          "สติปัญญา",
          "ร่างกาย",
          "การเรียนรู้",
          "การพูด",
          "พฤติกรรม",
          "ออทิสติก",
          "พิการซ้ำซ้อน",
        ],
      },
      employee: {
        id: this.$store.getters.myMember_id,
        name: this.$store.getters.myName,
        study_faculty: "",
        university: "",
        disability_type: "",
        isVisible: false,
      },
      isEdit: false,
      status: "บันทึก",
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      // this.employee.id = 0;
      // this.employee.name = "";
      this.employee.study_faculty = "";
      this.employee.university = "";
      this.employee.disability_type = "";
      this.employee.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.employees = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("Form employee:", this.employee);
        const newEmployee = {
          id: this.employee.id,
          name: this.employee.name,
          study_faculty: this.employee.study_faculty,
          university: this.employee.university,
          disibility_type: this.employee.disability_type,
          isVisible: this.employee.isVisible,
        };
        this.$emit("saveData", newEmployee);

        axios
          .post("http://localhost:85/ICPScoreCard/api.php", {
            action: "insert",
            id: this.employee.id,
            name: this.employee.name,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disibility_type: this.employee.disability_type,
          })
          .then((res) => {
            console.log(res);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost:85/ICPScoreCard/api.php", {
            action: "update",
            id: this.employee.id,
            name: this.employee.name,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disability_type: this.employee.disability_type,
          })
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editUser(id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api.php", {
          action: "edit",
          id: id,
        })
        .then(function (response) {
          console.log(response);
          self.employee.id = response.data.id;
          self.employee.name = response.data.name;
          self.employee.study_faculty = response.data.study_faculty;
          self.employee.university = response.data.university;
          self.employee.disability_type = response.data.disability_type;
          self.employees_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(id) {
      if (confirm("คุณต้องการลบรหัส " + id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost:85/ICPScoreCard/api.php", {
            action: "delete",
            id: id,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getAllUser();
  },
};
</script>

<style scoped>
h4 {
  color: #2f855a;
  text-shadow: 2px 2px #00ff33;
}
select {
  color: #2f855a;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  text-align: left;
}

label {
  color: #2f855a;
  font-weight: bold;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  cursor: pointer;
  padding: 0.05rem 1rem;
  border-radius: 15px;
}
</style>
