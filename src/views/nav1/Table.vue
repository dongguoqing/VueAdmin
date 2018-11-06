
<style type="text/css">
.myDialog {
  width: 35%;
}
</style>
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="F_Account" label="账户" width="120" sortable>
			</el-table-column>
			<el-table-column prop="F_RealName" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="F_Gender" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="F_Email" label="邮箱" width="190" sortable>
			</el-table-column>
			<el-table-column prop="F_MobilePhone" label="手机" width="140" sortable>
			</el-table-column>
			<el-table-column prop="F_OrganizeId" label="公司" :formatter="formatCompany" width="180" sortable>
			</el-table-column>
			<el-table-column prop="F_DepartmentId" label="部门" :formatter="formatDept" width="140" sortable>
			</el-table-column>
			<el-table-column prop="F_DutyId" label="岗位" :formatter="formatDuty" width="140" sortable>
			</el-table-column>
			<el-table-column prop="F_CreatorTime" label="创建时间" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" custom-class="myDialog" :close-on-click-modal="true" width="150%">
			<el-form :model="editForm" :inline="true" class="demo-form-inline" :rules="editFormRules" ref="editForm">

				<el-form-item label="账户" label-width="80px" prop="F_Account">
					<el-input style="width:217px" v-model="editForm.F_Account" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="80px" prop="F_UserPassword">
					<el-input style="width:217px" v-model="editForm.F_UserPassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司" label-width="80px" prop="company">
					<el-select v-model="editForm.F_OrganizeId" placeholder="请选择">
						<el-option v-for="item in companys" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" label-width="80px" prop="dept">
					<!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
					<el-select v-model="editForm.F_DepartmentId" placeholder="请选择">
						<el-option v-for="item in depts" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="角色" label-width="80px" prop="F_RoleId">
					<el-select v-model="editForm.F_RoleId" placeholder="请选择">
						<el-option v-for="item in roles" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="岗位" label-width="80px" prop="duty">
					<el-select v-model="editForm.F_DutyId" placeholder="请选择">
						<el-option v-for="item in dutys" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名" label-width="80px" prop="F_RealName">
					<el-input style="width:217px" v-model="editForm.F_RealName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" label-width="80px" prop="F_Gender">
					<el-select v-model="editForm.F_Gender" placeholder="请选择">
						<el-option v-for="item in sexArray" size="mini" :key="item.labels" :label="item.labels" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机" label-width="80px" prop="F_MobilePhone">
					<el-input style="width:217px" v-model="editForm.F_MobilePhone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="生日" label-width="80px" prop="F_Birthday">
					<el-date-picker style="width:217px" v-model="editForm.F_Birthday" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="微信" label-width="80px" prop="F_WeChat">
					<el-input style="width:217px" v-model="editForm.F_WeChat" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="80px" prop="F_Email">
					<el-input style="width:217px" v-model="editForm.F_Email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="类型" label-width="80px" prop="F_IsAdministrator">
					<el-select v-model="editForm.F_IsAdministrator" placeholder="请选择">
						<el-option v-for="item in isAdministrator" size="mini" :key="item.labels" :label="item.labels" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="允许登录" label-width="80px" prop="F_EnabledMark">
					<el-select v-model="editForm.F_EnabledMark" placeholder="请选择">
						<el-option v-for="item in enables" size="mini" :key="item.labels" :label="item.labels" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" width="1%">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/user";
import { getDeptList, getCompanyList, getDutyList } from "../../api/role";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      users: [],
      depts: [], //部门
      companys: [], //公司
      dutys: [], //岗位
      roles: [], //角色
      //允许登录
      enables: [{ value: true, labels: "是" }, { value: false, labels: "否" }],
      //类型
      isAdministrator: [
        { value: false, labels: "普通用户" },
        { value: true, labels: "超级管理员" }
      ],
      //性别
      sexArray: [{ value: false, labels: "女" }, { value: true, labels: "男" }],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        F_Account: "",
        F_RealName: "",
        F_Gender: "",
        F_Birthday: "",
        F_MobilePhone: "",
        F_Email: "",
        F_WeChat: "",
        F_OrganizeId: "",
        F_DepartmentId: "",
        F_RoleId: "",
        F_DutyId: "",
        F_EnabledMark: "",
        F_UserPassword: "******"
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      }
    };
  },
  methods: {
    //获取部门列表
    getDeptList() {
      getDeptList().then(Response => {
        this.depts = Response.data;
      });
    },
    //获取岗位列表和角色列表
    getDutyList() {
      getDutyList().then(response => {
        let data = response.data;
        for (var prop in data) {
          if (data[prop].F_Category == 2) this.dutys.push(data[prop]);
          else if (data[prop].F_Category == 1) this.roles.push(data[prop]);
        }
      });
    },
    //获取公司列表
    getCompanyList() {
      getCompanyList().then(response => {
        this.companys = response.data;
      });
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.F_Gender == true ? "男" : row.sex == false ? "女" : "未知";
    },
    //公司显示转换
    formatCompany(row, column) {
      if (row.F_OrganizeId) {
        let company = this.companys[row.F_OrganizeId];
        return company != undefined ? company.F_FullName : "";
      } else return "";
    },
    //岗位显示转换
    formatDuty: function(row, column) {
      if (row.F_DutyId) {
        let duty = this.dutys[row.F_DutyId];
        return duty != undefined ? duty.F_FullName : "";
      } else return "";
    },
    //部门显示转换
    formatDept: function(row, column) {
      if (row.F_DepartmentId) {
        let role = this.depts[row.F_DepartmentId];
        if (role != undefined && role != null)
          return this.depts[row.F_DepartmentId].F_FullName;
        else return "";
      } else {
        return "";
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        pageIndex: this.page,
        pageSize: 10
        //name: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();
      getUserListPage(para).then(res => {
        this.total = res.data.Count;
        this.users = res.data.Items;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.editForm.F_UserPassword = "******";
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getUsers();
    this.getDeptList();
    this.getCompanyList();
    this.getDutyList();
  }
};
</script>
