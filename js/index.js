// BMI 状态常量定义
const BMI_STATUS = {
    UNDERWEIGHT: {
        range: bmi => bmi < 18.5,
        class: 'bmi-underweight',
        text: '偏瘦',
        color: '#4A90E2'
    },
    NORMAL: {
        range: bmi => bmi >= 18.5 && bmi < 24,
        class: 'bmi-normal',
        text: '标准',
        color: '#48BB78'
    },
    OVERWEIGHT: {
        range: bmi => bmi >= 24 && bmi < 28,
        class: 'bmi-overweight',
        text: '偏重',
        color: '#ECC94B'
    },
    OBESE: {
        range: bmi => bmi >= 28,
        class: 'bmi-obese',
        text: '肥胖',
        color: '#F56565'
    }
};

// 健康建议配置
const HEALTH_ADVICE = {
    UNDERWEIGHT: {
        title: '健康建议：',
        items: [
            '规律三餐，逐步增加饮食量。',
            '多摄入高蛋白（如鸡胸、鱼虾、豆类）及优质碳水（全麦面包、糙米等）。',
            '每周 3-4 次力量训练，刺激肌肉生长。',
            '适量选食坚果、牛奶等健康高热量食物。',
            '保证每日 7-8 小时充足睡眠。'
        ]
    },
    NORMAL: {
        title: '健康建议：',
        items: [
            '持续保持健康生活习惯。',
            '每周 3-5 次运动，每次 30-60 分钟，有氧无氧结合。',
            '饮食均衡，注重营养搭配。',
            '定期监测体重，维持健康范围。'
        ]
    },
    OVERWEIGHT: {
        title: '健康建议：',
        items: [
            '每周 4-5 次有氧与无氧结合运动，每次 60-90 分钟。',
            '控制饮食，减少高热量、高脂肪食物，多吃蔬果。',
            '避免夜宵，作息规律。',
            '建议每月稳步减重 10-15 斤。'
        ]
    },
    OBESE: {
        title: '健康建议：',
        items: [
            '每周至少 5 次有氧与无氧结合运动，每次 90 分钟。',
            '可加入 HIIT 训练，提升代谢。',
            '在营养师指导下严格控食，制定饮食计划。',
            '增加日常活动，如步行、爬楼。',
            '建议每月减重 15-20 斤，勿过度节食。',
            '必要时咨询医生。'
        ]
    }
};

// 获取 BMI 状态信息
function getBMIStatus(bmi) {
    return Object.values(BMI_STATUS).find(status => status.range(bmi));
}

// 获取 BMI 状态类名
function getBMIStatusClass(bmi) {
    return getBMIStatus(bmi)?.class || BMI_STATUS.NORMAL.class;
}

// 获取 BMI 状态文本
function getBMIStatusText(bmi) {
    return getBMIStatus(bmi)?.text || BMI_STATUS.NORMAL.text;
}

// 获取 BMI 状态颜色
function getBMIStatusColor(bmi) {
    return getBMIStatus(bmi)?.color || BMI_STATUS.NORMAL.color;
}

// 获取健康建议
function getHealthAdvice(bmi) {
    // 确保bmi是数值类型
    const numericBmi = parseFloat(bmi);
    
    if (isNaN(numericBmi)) {
        console.error('Invalid BMI value:', bmi);
        return '<p>无法提供健康建议，BMI值无效</p>';
    }
    
    let adviceKey;
    if (numericBmi < 18.5) {
        adviceKey = 'UNDERWEIGHT';
    } else if (numericBmi >= 18.5 && numericBmi < 24) {
        adviceKey = 'NORMAL';
    } else if (numericBmi >= 24 && numericBmi < 28) {
        adviceKey = 'OVERWEIGHT';
    } else {
        adviceKey = 'OBESE';
    }
    
    const advice = HEALTH_ADVICE[adviceKey];
    if (!advice) {
        console.error('No advice found for key:', adviceKey);
        return '<p>无法提供健康建议</p>';
    }
    
    return `
        <p class="health-advice-title">${advice.title}</p>
        <ul style="margin-top: 5px; padding-left: 20px;">
            ${advice.items.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
}

// 体重范围计算
function getWeightRange(height, gender) {
    // 定义男女不同身高范围的标准体重范围
    const femaleRanges = [
        { height: [150, 154], weight: [90, 110] },
        { height: [155, 159], weight: [96, 116] },
        { height: [160, 164], weight: [102, 122] },
        { height: [165, 169], weight: [108, 128] },
        { height: [170, 174], weight: [115, 135] }
    ];

    const maleRanges = [
        { height: [165, 169], weight: [110, 140] },
        { height: [170, 174], weight: [120, 150] },
        { height: [175, 179], weight: [130, 158] },
        { height: [180, 184], weight: [140, 163] },
        { height: [185, 189], weight: [150, 170] }
    ];

    const ranges = gender === 'male' ? maleRanges : femaleRanges;
    
    // 查找对应的范围
    const range = ranges.find(r => height >= r.height[0] && height <= r.height[1]);
    
    if (!range) {
        // 如果身高不在预定范围内，使用最接近的范围
        if (gender === 'male') {
            if (height < 165) return maleRanges[0];
            if (height > 189) return maleRanges[maleRanges.length - 1];
        } else {
            if (height < 150) return femaleRanges[0];
            if (height > 174) return femaleRanges[femaleRanges.length - 1];
        }
    }
    
    return range;
}

// 基础体型指数计算
function calculateBaseIndex(height, weight, gender) {
    // 获取标准体重范围
    const weightRange = getWeightRange(height, gender);
    const currentWeightJin = weight * 2; // 将公斤转换为斤
    
    let baseIndexStatus = '';
    let baseIndexText = '';
    const genderText = gender === 'male' ? '男生' : '女生';
    
    if (!weightRange) {
        // 如果身高超出范围，使用原来的计算方法
        const standardWeightJin = (height - 100) * 0.9;
        const upperLimit = standardWeightJin * 1.2;
        const lowerLimit = standardWeightJin * 0.8;
        
        if (currentWeightJin > upperLimit) {
            baseIndexStatus = '大基数';
        } else if (currentWeightJin < lowerLimit) {
            baseIndexStatus = '小基数';
        } else {
            baseIndexStatus = '标准';
        }
        
        baseIndexText = `作为${genderText}，您的身高不在标准范围内，仅供参考：标准体重应为 ${standardWeightJin.toFixed(1)} 斤，当前体重 ${currentWeightJin.toFixed(1)} 斤。`;
        
    } else {
        const [minWeight, maxWeight] = weightRange.weight;
        
        if (currentWeightJin > maxWeight) {
            baseIndexStatus = '大基数';
            baseIndexText = `作为${genderText}，您的身高 ${height}cm 的标准体重范围应为 ${minWeight}-${maxWeight} 斤，当前体重 ${currentWeightJin.toFixed(1)} 斤，超过标准体重上限，属于大基数体型。`;
        } else if (currentWeightJin < minWeight) {
            baseIndexStatus = '小基数';
            baseIndexText = `作为${genderText}，您的身高 ${height}cm 的标准体重范围应为 ${minWeight}-${maxWeight} 斤，当前体重 ${currentWeightJin.toFixed(1)} 斤，低于标准体重下限，属于小基数体型。`;
        } else {
            baseIndexStatus = '标准';
            baseIndexText = `作为${genderText}，您的身高 ${height}cm 的标准体重范围应为 ${minWeight}-${maxWeight} 斤，当前体重 ${currentWeightJin.toFixed(1)} 斤，处于标准体重范围内。`;
        }
    }
    
    return {
        status: baseIndexStatus,
        text: baseIndexText,
        heightRange: weightRange ? `${weightRange.height[0]}-${weightRange.height[1]}` : null,
        weightRange: weightRange ? `${weightRange.weight[0]}-${weightRange.weight[1]}` : null,
        currentWeight: currentWeightJin.toFixed(1)
    };
}

// 显示结果
function displayResult(bmi, weight, height, gender) {
    const resultElement = document.getElementById('result');
    
    // 使用新的状态系统获取状态
    const status = getBMIStatusText(bmi);
    const statusColor = getBMIStatusColor(bmi);
    
    // 计算大小基数信息
    const baseIndexInfo = calculateBaseIndex(height, weight, gender);
    
    // 获取健康建议
    const healthAdvice = getHealthAdvice(bmi);

    // 显示结果容器
    resultElement.style.display = 'block';

    resultElement.innerHTML = `
        <div class="result-container ${getBMIStatusClass(bmi)}">
            <div class="bmi-report-header">
                <h3 class="bmi-report-title">健康报告</h3>
                <span class="bmi-report-status">${status}</span>
            </div>
            <div class="bmi-report-main">
                <div class="bmi-value-section">
                    <span class="bmi-number">${bmi}</span>
                    <span class="bmi-range">(BMI标准范围: 18.5-24.0)</span>
                </div>
                <div class="bmi-advice">
                    <p class="base-index-info">${baseIndexInfo.text}</p>
                    <div class="health-advice">${healthAdvice}</div>
                </div>
            </div>
        </div>
    `;
}

// 验证身高体重是否在合理范围内
function validateInputs(height, weight) {
    // 身高合理范围（单位：cm）
    const MIN_HEIGHT = 50;
    const MAX_HEIGHT = 250;
    
    // 体重合理范围（单位：kg）
    const MIN_WEIGHT = 20;
    const MAX_WEIGHT = 300;
    
    if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
        return {
            valid: false,
            message: `身高数值不合理，请输入 ${MIN_HEIGHT}cm 到 ${MAX_HEIGHT}cm 之间的有效身高。`
        };
    }
    
    if (weight < MIN_WEIGHT || weight > MAX_WEIGHT) {
        return {
            valid: false,
            message: `体重数值不合理，请输入 ${MIN_WEIGHT}kg 到 ${MAX_WEIGHT}kg 之间的有效体重。`
        };
    }
    
    return { valid: true };
}

// 保存用户输入到本地存储
function saveUserInputs(height, weight, gender) {
    const userInputs = {
        height: height,
        weight: weight,
        gender: gender,
        timestamp: new Date().getTime()
    };
    
    localStorage.setItem('bmiCalculatorUserInputs', JSON.stringify(userInputs));
}

// 从本地存储加载用户上次输入
function loadUserInputs() {
    const savedInputs = localStorage.getItem('bmiCalculatorUserInputs');
    if (savedInputs) {
        try {
            return JSON.parse(savedInputs);
        } catch (error) {
            console.error('Error parsing saved inputs:', error);
            return null;
        }
    }
    return null;
}

// 计算 BMI
function calculateBMI() {
    try {
        const weightElement = document.getElementById('weight');
        const heightElement = document.getElementById('height');
        const genderElement = document.getElementById('gender');

        if (!weightElement || !heightElement || !genderElement) {
            console.error('表单元素未找到');
            alert('系统错误：表单元素未找到，请刷新页面重试！');
            return;
        }

        const weight = parseFloat(weightElement.value);
        const height = parseFloat(heightElement.value);
        const gender = genderElement.value;

        if (isNaN(weight) || isNaN(height) || height === 0 || !gender) {
            alert('请输入有效的身高、体重和性别！');
            return;
        }
        
        // 验证输入是否在合理范围内
        const validation = validateInputs(height, weight);
        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        // 保存用户输入
        saveUserInputs(height, weight, gender);

        // 计算BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        console.log('Calculated BMI:', bmi);
        
        // 显示结果
        displayResult(bmi, weight, height, gender);

    } catch (error) {
        console.error('Error in calculateBMI:', error);
        alert('计算过程中出现错误，请重试！');
    }
}

// 页面加载完成后绑定事件
document.addEventListener('DOMContentLoaded', function() {
    // 绑定计算按钮点击事件
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }
    
    // 加载用户上次输入的数据
    const savedInputs = loadUserInputs();
    if (savedInputs) {
        const weightElement = document.getElementById('weight');
        const heightElement = document.getElementById('height');
        const genderElement = document.getElementById('gender');
        
        if (weightElement && savedInputs.weight) {
            weightElement.value = savedInputs.weight;
        }
        
        if (heightElement && savedInputs.height) {
            heightElement.value = savedInputs.height;
        }
        
        if (genderElement && savedInputs.gender) {
            genderElement.value = savedInputs.gender;
        }
    }
});