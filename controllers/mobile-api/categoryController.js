const dbTool = require("../../tools/dbTool");

async function getCategory(callBack) {
    let defaultCategory = {
        value: 0,
        label: "全部",
        isLeaf: true
    };
    let sql = "select id as value, category_name as label from t_category where parent_id=0;";
    let result = await dbTool.execSQL_promise(sql);
    // console.log(result);
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            let item = result[i];
            let child_sql = "select id as value, category_name as label from t_category where parent_id="+ item.value;
            let child = await dbTool.execSQL_promise(child_sql);
            if (child.length === 0 ){
                item.isLeaf = true;
            }
            item.children = child;
        }
        result.unshift(defaultCategory);
        callBack(result)
    }else {
        callBack([defaultCategory])
    }
}

module.exports = {
    getCategory
};
