export default {
	title: `الدراجات الهوائية`,
	header: `الدراجات الهوائية`,
	breadCrumb: `الدراجات الهوائية`,
	errors: {
		rowUpdateError: 'حصل خطأ أثناء حفظ التعديلات، يرجى المحاولة لاحقاً.',
		noDataSpecified: '-',
		noListLoaded: `حصل خطأ أثناء جلب المعطيات، يرجى المحاولة لاحقاً.`,
	},
	footer: {
		rowsPerPage: 'عدد الأسطر في الصفحة:',
		pageCounter: (from: number, to: number, total: number) => `${from}-${to} من ${total}`,
	},
	columns: {
		title: 'العنوان',
		description: 'التفاصيل',
		theftDate: 'تاريخ السرقة',
		reportingDate: 'تاريخ البلاغ',
		theftLocation: 'المنطقة',
		image: 'الصورة',
		actions: {
			menuTitle: 'العمليات',
			edit: 'تعديل',
		},
	},
	fields: {
		columnSelector: {
			noOptionsText: 'لم يتم العثور على حقول تطابق عملية البحث',
			tooltip: 'اختيار الحقول',
			placeholder: 'عنوان الحقل',
			hideAllLabel: 'إخفاء الكل',
			showAllLabel: 'إظهار الكل',
		},
	},
	filters: {
		label: 'المرشحات',
		fields: {
			status: {
				label: 'الحالة',
				options: [
					{ title: 'فعال', value: true },
					{ title: 'غير فعال', value: false },
				],
			},
		},
		actions: {
			Filter: 'ترشيح',
			clear: 'إلغاء',
		},
	},
}
