
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
          <el-input v-model="filters.name"></el-input>
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
    <el-table :data="roleList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="F_FullName" label="角色名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="F_EnCode" label="角色编号" width="120" sortable>
      </el-table-column>
      <el-table-column prop="F_Gender" label="角色类型" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="F_Email" label="归属机构" width="190" sortable>
      </el-table-column>
      <el-table-column prop="F_CreatorTime" label="创建时间" :formatter="formatTime" min-width="180" sortable>
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
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" custom-class="myDialog" :close-on-click-modal="true" width="150%">
      <el-form :model="editForm" :inline="true" class="demo-form-inline" :rules="editFormRules" ref="editForm">

        <el-form-item label="角色名称" label-width="80px" prop="F_Account">
          <el-input style="width:217px" v-model="editForm.F_Account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编号" label-width="80px" prop="F_UserPassword">
          <el-input style="width:217px" v-model="editForm.F_UserPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色类型" label-width="80px" prop="company">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" custom-class="myDialog" :close-on-click-modal="false" width="1%">
      <el-form :model="addForm" :inline="true" class="demo-form-inline" label-width="80px" :rules="addFormRules" ref="addForm">

        <el-form-item label="账户" label-width="80px" prop="F_Account">
          <el-input style="width:217px" v-model="addForm.F_Account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="F_UserPassword">
          <el-input style="width:217px" v-model="addForm.F_UserPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司" label-width="80px" prop="company">
          <el-select v-model="addForm.F_OrganizeId" placeholder="请选择">
            <el-option v-for="item in companys" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" label-width="80px" prop="dept">
          <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
          <el-select v-model="addForm.F_DepartmentId" placeholder="请选择">
            <el-option v-for="item in depts" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" label-width="80px" prop="F_RoleId">
          <el-select v-model="addForm.F_RoleId" placeholder="请选择">
            <el-option v-for="item in roles" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" label-width="80px" prop="duty">
          <el-select v-model="addForm.F_DutyId" placeholder="请选择">
            <el-option v-for="item in dutys" size="mini" :key="item.F_FullName" :label="item.F_FullName" :value="item.F_Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" label-width="80px" prop="F_RealName">
          <el-input style="width:217px" v-model="addForm.F_RealName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="80px" prop="F_Gender">
          <el-select v-model="addForm.F_Gender" placeholder="请选择">
            <el-option v-for="item in sexArray" size="mini" :key="item.labels" :label="item.labels" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="F_MobilePhone">
          <el-input style="width:217px" v-model="addForm.F_MobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" label-width="80px" prop="F_Birthday">
          <el-date-picker style="width:217px" v-model="addForm.F_Birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="微信" label-width="80px" prop="F_WeChat">
          <el-input style="width:217px" v-model="addForm.F_WeChat" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="F_Email">
          <el-input style="width:217px" v-model="addForm.F_Email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="80px" prop="F_IsAdministrator">
          <el-select v-model="addForm.F_IsAdministrator" placeholder="请选择">
            <el-option v-for="item in isAdministrator" size="mini" :key="item.labels" :label="item.labels" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="允许登录" label-width="80px" prop="F_EnabledMark">
          <el-select v-model="addForm.F_EnabledMark" placeholder="请选择">
            <el-option v-for="item in enables" size="mini" :key="item.labels" :label="item.labels" :value="item.value"></el-option>
          </el-select>
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
  getDeptList,
  getCompanyList,
  getDutyList,
  getRoleList
} from "../../api/role";

export default {
  data() {
    return {
      roleList: []
    };
  },
  methods: {},
  mounted() {
    let this_i = this;
    getRoleList().then(res => {
      let jsonData = res.data;
      jsonData.forEach((item, index) => {
        if (item.F_Type == 1 || item.F_Type) this_i.roleList.push(item);
      });
    });
  }
};
</script>
