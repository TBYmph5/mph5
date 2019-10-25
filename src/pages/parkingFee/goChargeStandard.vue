<template>
    <div class="wrap">
      <p class="pagetitle">
        停车收费标准
      </p>
      <div class="table">
        <div class="row thead">
          <div class="cell">停车时间</div>
          <div class="cell">收费标准</div>
        </div>
        <div class="row">
          <div class="cell">停车30分钟含以内</div>
          <div class="cell">免费</div>
        </div>
        <div class="row">
          <div class="cell">停车30分钟以上5小时（含）以内</div>
          <div class="cell">10元/辆 .次 </div>
        </div>
        <div class="row">
          <div class="cell">停车5小时以上10小时（含）以内</div>
          <div class="cell">15元/辆 .次</div>
        </div>
        <div class="row">
          <div class="cell">停车10小时以上15小时（含）以内</div>
          <div class="cell">20元/辆 .次</div>
        </div>
        <div class="row">
          <div class="cell">停车15小时以上</div>
          <div class="cell">25元/辆 .次</div>
        </div>
      </div>


    </div>
</template>

<script>
    export default {
        name: "goChargeStandard"
    }
</script>

<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    padding: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .pagetitle{
    width:100% ;
    font-size:15px;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: center;

  }
.table{
  width: 94%;
  /*height: 5rem;*/
  height: auto;
  margin: 30px auto;
  display: table;
  border: 0.5px solid rgba(153,153,153,0.1)
}
  .row{
    display: table-row;

  }
  .cell{
    display: table-cell;
    line-height: 30px;
    height:30px;
    border: 0.5px solid rgba(153,153,153,0.1);
    text-align: center;

  }
  .cell:first-child{
    /*text-align: center;*/
  }
</style>
