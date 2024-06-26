import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "../../scss/PortfolioBackOffice.scss";
import Button from "../../components/Boton";
import TextField from "../../components/CoTextField";
import CRUDNav from "../../components/CRUDNav";
import Modal from "../../components/Modal";
import { PortfolioItem } from "../../interfaces/backend/portfolio";
import portfolioService from "../../services/portfolio.service";

const PortfolioAddItem = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [descriptionModal, setDescriptionModal] = useState<string>("");

  const schema = yup.object().shape({
    key: yup.number().required("La key del portafolio es requerida."),
    category: yup.string().required("La categoria es requerida."),
    title: yup.string().required("El título es requerido."),
    alt: yup.string().required("El texto alt en la imagen es requerido."),
    description: yup.string().required("La descripcion es requerida."),
    linkTo: yup.string().required("El enlace hacia es requerida."),
    linkToText: yup.string().required("El texto del enlace es requerido."),
    hrefTo: yup.string().required("El enlace hacia es requerida."),
    img: yup.string().required("El enlace hacia es requerida."),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PortfolioItem>({
    resolver: yupResolver(schema),
    defaultValues: {
      img: "",
      alt: "",
      title: "",
      category: "",
      description: "",
      linkTo: "",
      linkToText: "",
      hrefTo: "",
      key: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    /** const formData = new FormData();
      formData.append("image", data.image);
      formData.append("alt", data.alt);
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("linkTo", data.linkTo);
      formData.append("linkToText", data.linkToText);
      formData.append("hrefTo", data.hrefTo); */

    const userData = {
      img: data.img,
      alt: data.alt,
      title: data.title,
      category: data.category,
      description: data.description,
      linkTo: data.linkTo,
      linkToText: data.linkToText,
      hrefTo: data.hrefTo,
      key: data.key,
    };

    // console.log("userData: ");
    // console.log(userData);

    await portfolioUpload(userData);
  };

  const portfolioUpload = async (userData: PortfolioItem) => {
    // const portfolioUpload = async (formData: any) => {
    try {
      await portfolioService.postPortfolioContent(userData);
      setDescriptionModal("Portfolio added successfully");
      setShowModal(true);
      reset();
    } catch (err: any) {
      setDescriptionModal("Portfolio not added successfully");
      setShowModal(true);
    }
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  return (
    <section className="section-wrrapper-styles">
      <h2 className="titleh-h2-padding">Portfolio CRUD Page</h2>
      <p>Page to Manage Portfolio Page</p>
      <CRUDNav
        contextName="Portfolio"
        handleClickAddItem={() => navigate("/backoffice/portfolio-additem")}
        handleClickEditItem={() => navigate("/backoffice/portfolio-edit-item")}
        handleClickDeleteItem={() =>
          navigate("/backoffice/portfolio-delete-item")
        }
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="portfolio-form"
        className="open-portfolio-styles"
      >
        <div className="portfolio-field-styles">
          <Controller
            name="key"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-key"
                className="portfolio-field-styles"
                label="Portfolio Key"
                variant="outlined"
                {...register("key")}
                {...field}
                ref={null}
                error={!!errors.key}
                helperText={errors.key ? errors.key?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-title"
                className="portfolio-field-styles"
                label="Portfolio Category Title"
                variant="outlined"
                {...register("title")}
                {...field}
                ref={null}
                error={!!errors.title}
                helperText={errors.title ? errors.title?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-description"
                label="Portfolio Description"
                variant="outlined"
                multiline
                rows={3}
                {...register("description")}
                {...field}
                ref={null}
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description?.message : ""
                }
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="alt"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-category"
                className="portfolio-field-styles"
                label="Image Alt Text"
                variant="outlined"
                {...register("alt")}
                {...field}
                ref={null}
                error={!!errors.alt}
                helperText={errors.alt ? errors.alt?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-category"
                className="portfolio-field-styles"
                label="Portfolio Category Title"
                variant="outlined"
                {...register("category")}
                {...field}
                ref={null}
                error={!!errors.category}
                helperText={errors.category ? errors.category?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="img"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-category"
                className="portfolio-field-styles"
                variant="outlined"
                label="Portfolio Image URL"
                // type="file"
                {...register("img")}
                {...field}
                ref={null}
                error={!!errors.img}
                helperText={errors.img ? errors.img?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="linkTo"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-linkto"
                className="portfolio-field-styles"
                variant="outlined"
                {...register("linkTo")}
                {...field}
                ref={null}
                label="Portfolio Link to Project"
                error={!!errors.linkTo}
                helperText={errors.linkTo ? errors.linkTo?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="linkToText"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-linkto"
                className="portfolio-field-styles"
                variant="outlined"
                {...register("linkToText")}
                {...field}
                ref={null}
                label="Portfolio Link Text"
                error={!!errors.linkToText}
                helperText={errors.linkToText ? errors.linkToText?.message : ""}
              />
            )}
          />
        </div>
        <div className="portfolio-field-styles">
          <Controller
            name="hrefTo"
            control={control}
            render={({ field }) => (
              <TextField
                data-testid="portfolio-linkto"
                className="portfolio-field-styles"
                variant="outlined"
                {...register("hrefTo")}
                {...field}
                ref={null}
                label="Portfolio Item Page Link"
                error={!!errors.hrefTo}
                helperText={errors.hrefTo ? errors.hrefTo?.message : ""}
              />
            )}
          />
        </div>
        <div className="button-form-styles">
          <Button
            variant="contained"
            data-testid="login"
            type="submit"
            value="Login"
          >
            Enviar
          </Button>
        </div>
      </form>
      <DevTool control={control} />
      <Modal
        title="Portfolio Upload Status"
        description={descriptionModal}
        button="Close"
        show={showModal}
        handleClose={modalCloseHandler}
      />
    </section>
  );
};

export default PortfolioAddItem;
