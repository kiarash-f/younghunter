import { useLanguage } from "../../../context/useLanguageContext";
import useCreateAlbum from "../../../hooks/useCreateAlbum";
import { Controller, useForm } from "react-hook-form";
import InputTextField from "../../../ui/InputTextField";
import useEditAlbum from "../../../hooks/useEditAlbum";
import { TagsInput } from "react-tag-input-component";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AlbumForm({ onClose, albumToEdit = {} }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { createAlbum, isCreating } = useCreateAlbum();
  const { editAlbum, isEditing } = useEditAlbum();
  const { language } = useLanguage();
  const { _id: editId } = albumToEdit;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (editId) {
      reset({
        enTitle: albumToEdit.title.en,
        faTitle: albumToEdit.title.fa,
        enCategory: albumToEdit.category.en,
        faCategory: albumToEdit.category.fa,
        enTags: albumToEdit.tags.en,
        faTags: albumToEdit.tags.fa,
      });
      setEnTags(albumToEdit.tags.en || []);
      setFaTags(albumToEdit.tags.fa || []);
    }
  }, [albumToEdit, reset, editId]);

  const [enTags, setEnTags] = useState([]);
  const [faTags, setFaTags] = useState([]);

  const albumImagePreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : albumToEdit.imageCover;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("imageCover", selectedFile);
    formData.append("title[en]", data.enTitle);
    formData.append("title[fa]", data.faTitle);
    formData.append("category[en]", data.enCategory);
    formData.append("category[fa]", data.faCategory);
    formData.append("tags[en]", data.enTags);
    formData.append("tags[fa]", data.faTags);

    const updatedData = {
      ...formData,
      title: { en: data.enTitle, fa: data.faTitle },
      category: { en: data.enCategory, fa: data.faCategory },
      tags: { en: enTags, fa: faTags },
    };
    if (editId) {
      await editAlbum(
        { id: editId, newAlbum: updatedData },
        {
          onSuccess: () => {
            toast.success(
              `${
                language === "en"
                  ? `Edit ${data.enTitle} successfully`
                  : `آلبوم ${data.faTitle} با موفقیت ویرایش شد`
              }`
            );
            onClose();
            reset();
            setEnTags([]);
            setFaTags([]);
          },
          onError: (error) => toast.error(error?.response?.data?.message),
        }
      );
    } else {
      await createAlbum(formData, {
        onSuccess: () => {
          toast.success(
            `${
              language === "en"
                ? `Create ${data.enTitle} successfully`
                : `آلبوم ${data.faTitle} با موفقیت ایجاد شد`
            }`
          );
          onClose();
          reset();
          setEnTags([]);
          setFaTags([]);
        },

        onError: (error) => toast.error(error?.response?.data?.message),
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      method="post"
    >
      <div className="flex items-center flex-col gap-y-3">
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label={language === "en" ? "English Title" : "عنوان به انگلیسی"}
            name="enTitle"
            register={register}
            required
            validationSchema={{
              required: `${
                language === "en" ? "Title is required" : "عنوان ضروری است"
              }`,
              minLength: {
                value: 3,
                message: `${
                  language === "en"
                    ? "Title must be atleast 3 character"
                    : "عنوان حداقل باید 3 کاراکتر باشد"
                }`,
              },
            }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label={language === "en" ? "Persian Title" : "عنوان به فارسی"}
            name="faTitle"
            register={register}
            required
            validationSchema={{
              required: `${
                language === "en" ? "Title is required" : "عنوان ضروری است"
              }`,
              minLength: {
                value: 3,
                message: `${
                  language === "en"
                    ? "Title must be atleast 3 character"
                    : "عنوان حداقل باید 3 کاراکتر باشد"
                }`,
              },
            }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label={
              language === "en"
                ? "English Category"
                : "عنوان دسته بندی به انگلیسی"
            }
            name="enCategory"
            register={register}
            required
            validationSchema={{
              required: `${
                language === "en"
                  ? "Category is required"
                  : "دسته بندی ضروری است"
              }`,
              minLength: {
                value: 3,
                message: `${
                  language === "en"
                    ? "Category must be atleast 3 character"
                    : "دسته بندی حداقل باید 3 کاراکتر باشد"
                }`,
              },
            }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <InputTextField
            label={
              language === "en"
                ? "Persian Category"
                : "عنوان دسته بندی به فارسی"
            }
            name="faCategory"
            register={register}
            required
            validationSchema={{
              required: `${
                language === "en"
                  ? "Category is required"
                  : "دسته بندی ضروری است"
              }`,
              minLength: {
                value: 3,
                message: `${
                  language === "en"
                    ? "Category must be atleast 3 character"
                    : "دسته بندی حداقل باید 3 کاراکتر باشد"
                }`,
              },
            }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <div className="flex items-center justify-between">
            <label htmlFor="imageCover" className="mb-1 block text-neutral-200">
              {language === "en" ? "Upload Image" : "بارگذاری عکس"}{" "}
              <span className="text-red-600">*</span>
            </label>
            {albumImagePreview && (
              <div className="">
                <img
                  src={albumImagePreview}
                  alt=""
                  className="w-14 h-14 object-cover"
                />
              </div>
            )}
          </div>
          <Controller
            name="imageCover"
            control={control}
            rules={{
              required:
                language === "en"
                  ? "Image Cover is required"
                  : "عکس کاور ضروری است",
              validate: {
                acceptedFormats: (fileList) =>
                  fileList &&
                  fileList.type &&
                  (fileList.type === "image/jpeg" ||
                    fileList.type === "image/jpg")
                    ? true
                    : language === "en"
                    ? "Only JPG image is allowed!"
                    : "فقط فرمت JPG مجاز است!",
                fileSize: (fileList) =>
                  fileList && fileList.size <= 20 * 1024 * 1024
                    ? true
                    : language === "en"
                    ? "File size must be less than 20MB"
                    : "حجم فایل نباید بیشتر از 20 مگابایت باشد",
              },
            }}
            render={({ field: { onChange, ref } }) => (
              <input
                type="file"
                name="imageCover"
                accept="image/jpeg, image/jpg"
                className="inputTextField"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  onChange(file);
                }}
                ref={ref}
              />
            )}
          />

          {errors?.image?.message && (
            <span className="text-red-600 block text-sm mt-2">
              {errors?.image?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-[80%] text-neutral-200">
          <label htmlFor="enTags">
            {language === "en" ? "English Tags" : "تگ ها به انگلیسی"}
          </label>
          <TagsInput value={enTags} onChange={setEnTags} name="enTags" />
        </div>
        <div className="flex flex-col w-[80%] text-neutral-200">
          <label htmlFor="faTags">
            {language === "en" ? "Persian Tags" : "تگ ها به فارسی"}
          </label>
          <TagsInput value={faTags} onChange={setFaTags} name="faTags" />
        </div>
        <div className="w-[80%] mt-2">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full px-4 py-3 font-bold text-lg rounded-xl transition-all duration-300 bg-blue-900 text-white hover:bg-blue-800"
          >
            {isCreating || isEditing ? (
              <h1 className="">...</h1>
            ) : editId ? (
              language === "en" ? (
                "Save Changes"
              ) : (
                "ذخیره تغییرات"
              )
            ) : language === "en" ? (
              "Post"
            ) : (
              "ایجاد کردن"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AlbumForm;
