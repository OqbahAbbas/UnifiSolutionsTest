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
			details: 'عرض التفاصيل',
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
			title: 'العنوان',
			distance: {
				label: 'المسافة',
				placeHolder: 'عدد الأميال حول ميونخ',
			},
			date: 'تاريخ السرقة',
		},
		actions: {
			filter: 'تطبيق',
			clear: 'إلغاء',
		},
	},
	results: 'الدراجات المسروقة حول ميونخ',
	view: {
		label: 'العرض',
		options: [
			{
				title: 'قائمة',
				val: 'list',
			},
			{
				title: 'جدول',
				val: 'table',
			},
		],
	},
	noFilterResults: 'لا يوجد نتائج بحث مطابقة',
}
