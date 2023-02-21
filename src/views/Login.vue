<template>
  <div class="login-main">
    <span class="title">
      重庆市涪陵区森林火灾监测预警与应急指挥系统
    </span>
    <div class="login-content">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="rule-form">
        <div class="con-title">用户登录</div>
        <el-form-item prop="user" class="login-item ">
          <span class="con-icon">
            <SvgIcon name="login-user" class="svg-login"></SvgIcon>
            <span class="split-line"></span>
          </span>
          <el-input v-model="ruleForm.user" clearable class="login-message" />
        </el-form-item>
        <el-form-item prop="pass" class="login-item">
          <span class="con-icon">
            <SvgIcon name="login-pwd" class="svg-login"></SvgIcon>
            <span class="split-line"></span>
          </span>
          <el-input v-model="ruleForm.pass" type="password" class="login-message" />
        </el-form-item>
        <el-form-item prop="code" class="login-item">
          <span class="con-icon">
            <SvgIcon name="login-code" class="svg-login"></SvgIcon>
            <span class="split-line"></span>
          </span>
          <el-input v-model="ruleForm.code" class="code-value" />
          <img :src="img" alt="" class="code-img">
          <label class="change-img">换一张</label>
        </el-form-item>
        <el-form-item class="login-item bt">
          <button class="bt-login" @click="submitForm(ruleFormRef)">登录</button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang='ts'>
// 方法引入
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { getCaptchaImg, sighIn } from '@/utils/user';
// 接口引入
import { captchaImage } from "@/api/login";

onMounted(() => {
  getCaptchaImg((datas: any) => {
    img.value = 'data:image/gif;base64,' + datas.img
    uuid.value = datas.uuid
  })
})
let img = ref<any>("")
let uuid = ref<string>("")
const ruleFormRef = ref<FormInstance>()
const validateUser = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
const validateCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('验证码不能为空'))
  } else {
    callback()
  }
}
const ruleForm = reactive({
  user: 'wangjianlei',
  pass: '123456',
  code: '4'
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  user: [{ validator: validateUser, trigger: 'blur' }],
  code: [{ validator: validateCode, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      sighIn(ruleForm)
    } else {
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
.login-main {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login/back.png") no-repeat;
  background-size: 100% 100%;


  .title {
    display: flex;
    height: 30%;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    letter-spacing: 5px;
    font-weight: bold;
    background: linear-gradient(0deg, #939189 45%, #ffffff 55%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .login-content {
    width: 900px;
    height: 500px;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .rule-form {
      width: 459px;
      height: 418px;
      background: url("@/assets/images/login/box.png");
      padding: 25px;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      flex-direction: column;

      .con-title {
        font-size: 34px;
        font-weight: bolder;
        letter-spacing: 5px;
        background: linear-gradient(0deg, rgba(147, 145, 137, 0.97) 0%, rgba(255, 255, 255, 0.97) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 25px;
      }

      .login-item {
        width: calc(95% - 30px);
        background: #4C4C4D;
        border-radius: 3px;
        padding: 5px 15px;
        margin: 10px 0;
        height: 45px;

        &.bt {
          transform: translateY(20px);
          background: #41454B !important;
        }

        :deep(.el-form-item__content) {
          margin: 0 !important;

          .el-input__wrapper {
            background: transparent;
            box-shadow: none;

            .el-input__inner {
              color: #ffffff;
            }
          }

          .el-form-item__error {
            top: calc(100% + 8px);
            right: 0;
            left: initial;
          }
        }

        .con-icon {
          display: inline-flex;
          height: 100%;
          align-items: center;

          .svg-login {
            width: 26px !important;
            height: 30px !important;
          }

          .split-line {
            display: inline-block;
            width: 2px;
            height: 35%;
            background: #8f8e8ee3;
            margin: 0 8px;
          }
        }


        .login-message {
          flex: 1;
        }

        .code-value {
          flex: 1;
        }

        .code-img {
          margin-left: 10px;
          width: 85px;
          height: 35px;
          margin: 0 15px;
        }

        .change-img {
          color: #1F98FE;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-style: double;
          font-size: 14px;
        }

        .bt-login {
          background: transparent;
          border: none;
          color: #1F98FE;
          font-size: 16px;
          width: 100%;
          height: 100%;
          letter-spacing: 3px;

          &:hover {
            cursor: pointer;
            font-weight: bolder;
          }
        }
      }

    }
  }

}
</style>
