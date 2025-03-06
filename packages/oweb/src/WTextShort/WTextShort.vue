<template>
  <ARate
    v-if="dataType === 'rate'"
    v-bind="$attrs"
    :count="rateMax"
    :model-value="dataValue === emptyText ? 0 : dataValue"
    disabled
  />
  <ATypographyText
    v-else
    class="shortext"
    v-bind="$attrs"
    :copyable="formatProps.copyable"
    :ellipsis="formatProps.ellipsis"
    :class="[
      formatProps.apperence,
      formatProps.status,
      formatProps.bold ? 'bold' : '',
    ]"
  >
    {{ prefix }} {{ dataValue }} {{ suffix }}
  </ATypographyText>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DATE_TYPE_FORMATE } from '@outils/format'
import type { WTextShortProps } from './type'

const props = withDefaults(defineProps<WTextShortProps>(), {
  dataType: 'text',
  content: '',
  emptyText: '-',
  rateMax: 5,
})

// const { getDicWithValue } = useDicCodes({
//   codes: props.dcitionaryCode ? [props.dcitionaryCode] : [],
// })

const formatProps = computed(() => {
  const { ellipsisConf } = props
  const ellipsis =
    ellipsisConf === true ? { showTooltip: true, rows: 1 } : ellipsisConf
  const fvalues = props.format
    ? { ...props, ...props.format(props.content, props), ellipsis }
    : { ...props, ellipsis }
  return fvalues
})

const dataValue = computed(() => {
  const {
    emptyText,
    dataType = 'text',
    content,
    // dcitionaryCode,
    options,
  } = formatProps.value

  if (content === undefined || content === null) return emptyText

  // 存在options
  if (options && options.length > 0) {
    return options.find((item) => item.value === content)?.label || content
  }
  // 使用dictionaryData
  // if (dcitionaryCode) {
  //   // console.log(content, getDicWithValue(dcitionaryCode, `${content}`)?.label)
  //   return getDicWithValue(dcitionaryCode, `${content}`)?.label || content
  // }

  // 格式化
  const fn = DATE_TYPE_FORMATE[dataType]
  return fn(content) || content
})
</script>

<style scoped lang="less">
@status: {
  danger: var(--danger-7);
  success: var(--success-7);
  warning: var(--warning-7);
  info: var(--primary-7);
};

.shortext {
  margin: 0;
  color: inherit;
  each(@status,{
		&.@{key} {
			color: rgba(@value);
    	}
	});
}

.bold {
  font-weight: 700;
}

.tag {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--color-fill-2);
  each(@status,{
		&.@{key} {
			color: rgba(@value);
        	// border: 1px solid rgb(@value);
			background-color: rgba(@value, 0.1);
    	}
	});
}

.link {
  color: rgba(var(--primary-7));
  cursor: pointer;
  &:hover {
    color: rgba(var(--primary-8));
  }
}

.dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &::before {
    display: block;
    flex: 0 0 auto;
    content: '';
    width: 10px;
    height: 10px;
    background-color: var(--color-fill-4);
    border-radius: 10px;
    margin-right: 4px;
  }
  each(@status,{
		&.@{key} {
			&::before {
				background-color: rgba(@value);
			}
    	}
	});
}
</style>
@outils/format
